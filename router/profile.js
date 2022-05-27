const express = require("express")
const router = express.Router()
const path = require("path")
const Article = require("../model/article.js")
const multer = require("multer")
let imgType = null
const storage = multer.diskStorage({
    destination: (req, file, res) => {
        res(null, "./public/images")
    },
    filename: (req, file, res) => {
        imgType = path.extname(file.originalname)
        res(null, req.session.username + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

/**
 * Show the articles of user on main page
 */
router.get("/profile", (req, res, next) => {
    if (req.session.isVerified) {

        Article.getUserArticles(req.session.username)
        .then(results => {
            res.render("./profile", {username: req.session.username, articles: results})
        })
        .catch((err) => {
            next(err)
        })
    }
    else {
        res.render("login", {msg: "請先登入用戶"})
    }
})

/**
 * Upload image
 * Client send image data by ajax (http request)
 * Put the image in system direction, then store referece to database
 * Send the reference to client
 */
router.post("/upload", upload.single("image"), (req, res, next) => {
    if (req.session.isVerified) {

        Article.upload_image(`../images/${req.session.username}${imgType}`, req.session.username)
        .then(results => {
            res.send(`../images/${req.session.username}${imgType}`)
        })
        .catch(err => {
            next(err)
        })
    }
    else {
        res.render("login", {msg: "請先登入用戶"})
    }
})

module.exports = router
