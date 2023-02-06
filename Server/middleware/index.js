require('dotenv').config()
const { expressjwt: jwt } = require('express-jwt')
const User = require('../models/user')

const requireSignIn = jwt({
    getToken: (req, res)=> req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms:['HS256']
})

 const isInstructor = async (req, res, next) => {
    try {
      const user = await User.findById(req.auth.id).exec();
      if (!user.role.includes("Instructor")) {
        return res.sendStatus(403);
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {requireSignIn, isInstructor}


