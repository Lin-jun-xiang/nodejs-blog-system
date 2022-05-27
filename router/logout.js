const express = require("express")
const router = express.Router()

router.get("/logout", (req, res, next) => {
    try {
        req.session.isVerified = false
        req.session.username = ""
        res.render("./login", {msg: "用戶已登出"})
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
