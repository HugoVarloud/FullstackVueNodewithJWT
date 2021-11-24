const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    secret: process.env.TOKEN_SECRET,
    user: process.env.user, 
    pass: process.env.pass,
  };