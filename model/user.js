const conn = require("./db.js")
const CryptoJS = require("crypto-js")
const validator = require("email-validator")

module.exports = class User {
    static secretKey = "KEY"

    static find_user(email, password) {
        let sql = "SELECT * FROM user WHERE (email) = (?)"

        return new Promise((resolve, reject) => {
            if (!validator.validate(email)) {
                reject("Not a email.")
            }
            if (email.length == 0 || password.length == 0) {
                reject("Cannot empty input.")
            }

            conn.query(sql, [email])
            .then(results => {
                if (results.length != 0) {
                    results = results[0]
                    const dePassword = CryptoJS.AES.decrypt(results["password"], this.secretKey).toString(CryptoJS.enc.Utf8)

                    if (password == dePassword) {
                        resolve(results)
                    }
                    else {
                        reject("Password wrong.")
                    }
                }
                else {
                    reject("Not found user.")
                }
            })
        }) 
    }

    static add_user(username, email, password, rePassword) {

        let sql = "SELECT * FROM user WHERE email = ?"

        return new Promise((resolve, reject) => {
            // 驗證信箱是否真實
            if (!validator.validate(email)) {
                console.log("Not a email")
                reject(false)
            }

            // 驗證信箱是否註冊過
            conn.query(sql, [email])
            .then(results => {
                if (results.length != 0) {
                    console.log("User have been exists.")
                    reject("User have been exists.")
                }

                else if (password != rePassword) {
                    reject("rePassword wrong.")
                }

                else {
                    password = CryptoJS.AES.encrypt(password, this.secretKey).toString();

                    let sql = "INSERT INTO user (username, email, password)\
                    VALUES (?, ?, ?)"

                    conn.query(sql, [username, email, password])
                    resolve(true)
                }
            }
            )
        })
    }
}
