const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { registerValidation, loginValidation } = require('../validation')
const nodemailer = require('../config/nodemailer.config')

//REGISTER
router.post('/register', async (req, res) => {
    try {
        //Data Validation
        const { error } = registerValidation()
        if (error) return res.status(400).send(error.details[0].message)

        //Check if already register
        const emailExist = await User.findOne({ email: req.body.email })
        if (emailExist) return res.status(400).send('Email already exist')

        //Check if email format is ok then proceed to registrartion or send an error message
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(req.body.email) == true) {

            //Hash the passwords with bcrypt
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            //Create a new user
            const temptoken = jwt.sign({ email: req.body.email }, process.env.TEMP_TOKEN)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                confirmationCode: temptoken
            })

            try {
                await user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    // res.send({
                    //     message: "User was registered successfully! Please check your email",
                    // });

                    nodemailer.sendConfirmationEmail(
                        user.name,
                        user.email,
                        user.confirmationCode
                    );
                    // res.redirect("/");
                })
                res.send({ user: user._id })
            } catch (err) {
                res.status(400)
            }
        }
        else { return res.status(400) }
    }
    catch (e) { res.send(e) }
})

//CONFIRM EMAIL
router.get('/confirm/:confirmationCode', async (req, res) => {
    User.findOne({
        confirmationCode: req.params.confirmationCode,
    })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            user.status = "Active";
            user.save((err) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
            });
        })
        .catch((e) => console.log("error", e));
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        //Data Validation
        const { error } = loginValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        //Check if email exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('Wrong Email')
        //Password Check
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).send('Invalid Password')
        //Create and asign a token
        const token = jwt.sign({ _id: user._id, name: user.name }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send({ token })
        // BTW .send(Token) generate a warning because the token have already been asigned
        res.send('Logged in')
        //Check if Email has been verified
        if (user.status != "Active") {
            return res.status(401).send({
                message: "Pending Account. Please Verify Your Email!",
            });
        }
    } catch (err) {
        console.log(err)
        return res.send({
            res,
            message: err,
            statusCode: 500,
        })
    }
})

//VALID TOKEN
// router.post('/check', async, )

module.exports = router
