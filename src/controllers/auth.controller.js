const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");

// const passport = require("../configs/passport")

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRECT_KEY)
}


// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });


// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate(
//         "google",
//         {
//             successRedirect: "/",
//             failureRedirect: "/auth/google/failure",
//         },

//     ),
//     (req, res) => {
//         let token = newToken(req)
//         res.status(200).json({ token })
//     }
// );

router.post("/register", async (req, res) => {

    try {
        const isUserExist = await User.findOne({ email: req.body.email });
        const isUsernameExist = await User.findOne({ userName: req.body.userName });

        if (isUserExist || isUsernameExist) {
            return res.status(200).json({
                status: false,
                message: "This user is already exists"
            })
        }
        else {

            const user = await User.create(req.body)
            const authToken = newToken(user);
            return res.status(201).json({
                status: true,
                authToken,
                message: "User registered"
            })
        }
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
})


router.post("/login", async (req, res) => {
    try {

        const isUserExist = await User.findOne({ email: req.body.email }).select("+password");
        const user = await User.findOne({ email: req.body.email })

        if (!isUserExist) {
            return res.status(200).json({
                status: false,
                message: `User is not registered with this email : ${req.body.email}`
            })
        }
        else {
            const matching = isUserExist.checkPassword(req.body.password);
            console.log(matching)
            if (!matching) {
                return res.status(200).json({
                    status: false,
                    message: "Used password was wrong"
                })
            }

            const authToken = newToken(isUserExist);
            return res.status(200).json({
                status: true,
                authToken,
                message: "Login success",
                user: user
            })
        }
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
})

module.exports = router