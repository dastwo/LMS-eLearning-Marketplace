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
            password
        })
        await user.save()
        return res.status(200).json({ ok: true, message:'user saved'})
        
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
} 

const login = async (req, res)=>{
    try {
        
    } catch (error) {
       return res.status(500).json({message: error.message})
    }
}

module.exports = {register, login}