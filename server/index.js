const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var cors = require('cors')

app.use(cors())
 
//Import routes
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/profil')
const challengeRoute = require('./routes/challenge')

dotenv.config()

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, () => {
    console.log('Connected To DB')
})

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/profil', dashboardRoute)
app.use('/api/challenge', challengeRoute)

app.listen(3000, () => console.log('Server Up and running'))
