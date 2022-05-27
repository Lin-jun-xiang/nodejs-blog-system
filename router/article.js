const express = require("express")
const router = express.Router()
const Article = require("../model/article.js")
const conn = require("../model/db.js");

/**
 * Get the new articles list in home page
 */
router.get("/", (req, res, next) => {
    Article.getArticlesList()
    .then(results => {
        res.render("index",
                    {session_status: req.session.isVerified,
                     username: req.session.username,
                     articles: results})
    })
    .catch(err => {
        next(err)
    })
})

/**
 * Get the search articles list in home page
 */
router.post("/searchArticles", (req, res, next) => {
    let keyword = req.body.payload

    Article.getListByKeyword(keyword)
    .then(results => {
        // console.log(results)
        res.send(results)
    })
    .catch(err => {
        next(err)
    })
})

/**
 * View the article
 */
router.get("/article/:id", (req, res) => {
    let id = req.params.id

    Article.getArticleById(id)
    .then(result => {
        let UTCTime = result[0]["time"]
        let UTCTimeObj = new Date(UTCTime)
        result[0]["time"] = UTCTimeObj.toLocaleString()

        console.log(result)
        res.render(`./article`,
                    {session_status: req.session.isVerified,
                     article: result[0]})
    })
})

/**
 * Post article, then show the new article on main page
 */
router.post("/profile/AddArticle", (req, res, next) => {
    if (!req.session.isVerified) {
        res.render("./login", {msg: "請先登入用戶"})
    }

    let {title, content} = req.body
    let author = req.session.username

    let sql = "SELECT NOW()"
    conn.query(sql)
    .then(results => {
        let time = results[0]["NOW()"]
        let article = {
            title: title,
            content: content,
            author: author,
            time: time,
        }
    
        Article.add_article(article)
        .then(results => {
            Article.getUserArticles(req.session.username)
            .then(results => {
                res.render("./profile", {username: req.session.username, articles: results})
            })
            .catch((err) => {
                next(err)
            })
        })
        .catch(err => {
            next(err)
        })
    })

})

/**
 * Delete article, then show the new article on main page
 */
router.post("/del/:id", (req, res) => {
    // From post requeast -> ":id"
    let id = req.params.id

    Article.del_article(id)
    .then(results => {
        if (results > 0) {
            Article.getUserArticles(req.session.username)
            .then(results => {
                res.render("./profile", {username: req.session.username, articles: results})
            })
            .catch((err) => {
                next(err)
            })
        }
        else {
            res.json({code: -1, msg: "刪除失敗"})
        }
    })
    .catch(err => {
        next(err)
    })
})


/**
 * Edit the article
 */
router.post("/edit/:id", (req, res, next) => {
    if (!req.session.isVerified) {
        res.render("./login", {msg: "請先登入用戶"})
    }

    let id = req.params.id
    let { title, content } = req.body


    let sql = "SELECT NOW()"

    conn.query(sql)
    .then(results => {
        let time = results[0]["NOW()"]
        let article = {
            id: id,
            title: title,
            content: content,
            time: time,        
        }

        Article.edit_article(article)
        .then(results => {

            Article.getUserArticles(req.session.username)
            .then(results => {
                res.render("./profile", {username: req.session.username, articles: results})
            })
            .catch((err) => {
                next(err)
            })
        })
        .catch(err => {
            console.log("Edit error.")
            next(err)
        })
    })
    .catch(err => {
        console.log("edit error when connect to db.")
        next(err)
    })

})
module.exports = router
