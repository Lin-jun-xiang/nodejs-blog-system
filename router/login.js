const express = require("express")
const router = express.Router()
const User = require("../model/user.js")
const Article = require("../model/article.js")

router.post("/login", (req, res, next) => {
    let {email, password} = req.body

    try {
        User.find_user(email, password)
        .then((result) => {
            req.session.isVerified = true
            req.session.username = result["username"]

            Article.getArticlesList()
            .then(results => {
                res.render("index",
                            {session_status: req.session.isVerified,
                             username: req.session.username,
                             articles: results});
            })
            .catch(err => {
                next(err)
            })
        })
        .catch ((err) => {
            res.render("login", {msg: err})
        })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
