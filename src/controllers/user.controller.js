const express = require("express");
const authCheck = require("../middlewares/authCheck");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json(users)
    }
    catch (e) {
        return res.status(500).json({ status: "failed", massege: e.massege })
    }
})

router.get("/:id", async (req, res) => {

    const { id } = req.params

    try {
        const user = await User.findById(id);
        return res.status(200).json(user)
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
})


router.patch("/:id", authCheck, async (req, res) => {

    const { id } = req.params

    try {
        const currentUser = await User.findById(id);

        if (req.body.authUser.email === currentUser.email) {
            const user = await User.findByIdAndUpdate(id, req.body, { new: true });
            return res.status(200).json({
                status : true,
                user,
                message : "User updated successfully"
            })
        }
        else{
            return res.status(200).json({
                status : false,
                message : "Unauthorized action"
            })
        }
    }
    catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
})

module.exports = router