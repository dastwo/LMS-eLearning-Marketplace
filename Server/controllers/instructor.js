const User = require('../models/user')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const queryString = require('querystring')

const makeInstructor = async (req, res)=>{
    try {
        
        const user = await User.findById(req.auth.id).exec()
        if(!user.stripe_account_id){
            const account = await stripe.account.create({type:'standard'})
            user.stripe_account_id = account.id
            user.save()
        }

        let accountLink = await stripe.accountLink.create({
            account: user.stripe_account_id, 
            refresh_url:process.env.STRIPE_REDIRECT_URL,
            return_url:process.env.STRIPE_REDIRECT_URL,
            type: 'account_onboarding',
        })

        accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email
        })
        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
    } catch (err) {
        console.log('makeInstructor err =>', err);
        res.status(500).json({message: err})
    }
}



module.exports = {makeInstructor}