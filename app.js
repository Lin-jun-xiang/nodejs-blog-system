const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const engine = require("ejs-locals");
const session = require("express-session");

app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

// middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "MySessionKey"}))
app.use(express.json())

// Home page
app.get("/", require("./router/article"))

// Home page / Searching articles
app.post("/searchArticles", require("./router/article"))

// Article page / View article
app.get("/article/:id", require("./router/article"))

// Login page
app.get("/login", (req, res) => {
    res.render("login", {msg: ""});
})

app.post("/login", require("./router/login"))

// Logout page
app.use(require("./router/logout"))

// Signup page
app.get("/signup", (req, res) => {
    res.render("signup", {msg: ""});
})

app.post("/signup", require("./router/signup"))

// Profile page / Post article
app.get("/profile", require("./router/profile"))

app.post("/profile/AddArticle", require("./router/article"))

// Profile page / Del article
app.post("/del/:id", require("./router/article"))

// Profile page / Edit article
app.post("/edit/:id", require("./router/article"))

// Profile page / Upload image
app.post("/upload", require("./router/profile"))

// Routing for all
app.get("/*", (req, res) => {
    res.status(404).send("404 not found!");
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server has started on ${PORT}!`))
