require('dotenv').config()
const { expressjwt: jwt } = require('express-jwt')

const requireSignIn = jwt({
    getToken: (req, res)=> req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms:['HS256']
})

module.exports = {requireSignIn}


