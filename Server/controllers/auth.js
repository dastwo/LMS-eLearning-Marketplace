const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {hashPassword, comparePassword} = require('../utils/auth')

 const register = async (req, res, next)=>{
    try {
        
        const {name, email, password} = req.body.user
        if(!name) return res.status(400).json({message:'name is required'})
        if(!password || password.length < 6){
            return res.status(400).json({message:'password is required and should be min 6 characters long'})
        }
        let userExist = await User.findOne({email})
        if(userExist) return res.status(400).json({message:'Email is taken'})

        const hashedPassword = await hashPassword(password)

        const user  = User({
            name, 
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(200).json({ ok: true, message:'user saved'})
        
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
} 

const login = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json('User not exists')
        const checkPassword = await comparePassword(password, user.password)
        if(!checkPassword) return res.status(400).json('Password error try agin')
        const token = jwt.sign({id: user._id},process.env.SECRET_JWT, {
            expiresIn: '7d'
        })
        user.password = undefined
        res.cookie('token', token, {
            httpOnly: true,
            // secure: true
        })
        res.status(200).json(user)
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

const logout = async (req, res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({message: 'Logout success'})
    } catch (error) {
        return res.status(400).json(error.message)
    }
}
module.exports = {register, login, logout}