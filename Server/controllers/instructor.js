const User = require("../models/user");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const queryString = require("querystring");

const makeInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id).exec();
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: "express" });
      user.stripe_account_id = account.id;
      user.save();
    }
console.log('STRIPE ID =>', user.stripe_account_id);
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: "account_onboarding",
    });

    accountLink = Object.assign(accountLink, {
      "stripe_user[email]": user.email,
    });
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log("makeInstructor err =>", err);
    res.status(500).json({ message: err });
  }
};

const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id).exec();

    const account = await stripe.accounts.retrieve(user.stripe_account_id);

    if (!account.charges_enabled) {
      return res.status(401).send("Unauthorized");
    } else {
      const updateUserStripe = await User.findByIdAndUpdate(
        req.auth.id,
        {
          stripe_seller: account,
          $addToSet: { role: "Instructor" },
        },
        { new: true }
      )
        .select("-password")
        .exec();
      res.status(200).json(updateUserStripe);
    }
  } catch (err) {
    console.log("getAccountStatus =>", err);
  }
};

const currentInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.auth.id).exec();
    if (!user.role.includes("Instructor")) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.log("currentInstructor =>", err);
    res.status(500).json({ message: "current Instructor error" });
  }
};

module.exports = { makeInstructor, getAccountStatus, currentInstructor };
