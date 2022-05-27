const conn = require("./db.js");
const DbFunc = require("./function.js");

function db_creator() {
    let sql = "CREATE TABLE user (\
        id INT(255) AUTO_INCREMENT PRIMARY KEY,\
        username VARCHAR(255),\
        email VARCHAR(255),\
        password VARCHAR(255)\
        )";
    conn.query(sql);

    sql = "CREATE TABLE article (\
        id INT(255) AUTO_INCREMENT PRIMARY KEY,\
        title VARCHAR(50),\
        time DATE DEFAULT CURRENT_TIMESTAMP,\
        content VARCHAR(255),\
        author VARCHAR(255),\
        )";
    conn.query(sql);
}

function user_insertor(id, username, email, password, secretKey="KEY") {
    password = CryptoJS.AES.encrypt(password, secretKey).toString();

    if (!validator.validate(email)) {
        console.log("Not a email");
    }

    let sql = "INSERT INTO user (id, username, email, password)\
        VALUES (?, ?, ?, ?)";
    conn.query(sql, [id, username, email, password]);
};

function article_insertor(id, title, time, content, author) {
    

}

// user_insertor(1, "Bosh", "1@gmail.com", "1");

// let sql = "SELECT * FROM article"
// conn.query(sql).then(results => {
//     // db time to local
//     let UTCTime = results[3]["time"]
//     let UTCTimeObj = new Date(UTCTime)
//     console.log(UTCTimeObj.toLocaleString())
// })

// // local time
// let localeTimeObj = new Date();
// console.log(localeTimeObj.toUTCString())

// conn.query("SELECT NOW()").then(results=> {
//     let db_time = results[0]["NOW()"]
//     console.log(results[0]["NOW()"])
//     localeTimeObj = new Date(db_time);
//     console.log(localeTimeObj.toLocaleString())
// })