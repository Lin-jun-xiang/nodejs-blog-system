const express = require("express")
const router = express.Router()
const User = require("../model/user.js")

router.post("/signup", (req, res, next) => {
    let {username, email, password, rePassword} = req.body;

    try {
        User.add_user(username, email, password, rePassword)
        .then(() => {
            res.render("signup", {msg: "註冊成功"})
        }) 
        .catch ((err) => {
            res.render("signup", {msg: err})
        })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
