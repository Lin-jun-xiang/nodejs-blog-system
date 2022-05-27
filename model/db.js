const mysql = require("mysql")

module.exports = class DbModel {
    static conn = null

    static connection() {
        DbModel.conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            port: '3306',
            database: "blog",
        })
    }

    static end() {
        if (null != DbModel.conn) {
            DbModel.conn.end();
        }
    }

    /**
     * 
     * @param {str} sql SQL語句 
     * @param {Array} params SQL接受參數 - "?"
     * @returns 
     */
    static query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection()

            DbModel.conn.query(sql, params, (err, results) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
            })

            this.end()
        })
    }
}
