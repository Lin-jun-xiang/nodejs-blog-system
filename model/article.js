module.exports = class Article extends require("./db.js") {
    /**
     * 首頁陣列最新文章
     */
    static getArticlesList() {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM article ORDER BY TIME DESC"

            this.query(sql)
            .then(results => {
                resolve(results)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 獲取指定關鍵詞的文章 (搜索)
     * @param {string} keyword
     */
    static getListByKeyword(keyword) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM article WHERE title LIKE ? OR author LIKE ? ORDER BY TIME DESC"

            this.query(sql, [`%${keyword}%`, `%${keyword}%`])
            .then(results => {
                resolve(results)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 獲取指定文章詳情
     * @param {integer} id 
     */
    static getArticleById(id) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM article WHERE id = ?"

            this.query(sql, [id])
            .then(results => {
                resolve(results)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * 陳列使用者文章
     * @param {string} author
     */
    static getUserArticles(author) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM article WHERE author = ?"

            this.query(sql, [author])
            .then(results => {
                resolve(results)
            })
            .catch((err) => {
                reject(err)
            })
        })
    };

    /**
     * 新增文章
     * @param {JSON} article 
     */
    static add_article(article) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO article SET ?"

            this.query(sql, article)
            .then(results => {
                console.log("文章添加成功")
                resolve(results.insertId)
            })
            .catch((err) => {
                console.log("文章添加失敗", err)
                reject(err)
            })
        })
    }

    /**
     * 刪除文章
     * @param {integer} id 
     */
    static del_article(id) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM article WHERE id = ?"

            this.query(sql, id)
            .then(results => {
                console.log("刪除文章成功")
                resolve(results.affectedRows)
            })
            .catch(err => {
                console.log("刪除文章失敗", err)
                reject(err)
            })
        })
    }

    /**
     * 編輯使用者文章
     * @param {JSON} article
     */
    static edit_article(article) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE article SET title = ?, content = ? , time = ? WHERE id = ?"

            this.query(sql, [article.title, article.content, article.time, article.id])
            .then(results => {
                console.log("資料庫文章已編輯")
                resolve(results.affectedRows)
            })
            .catch(err => {
                console.log("資料庫文章編輯失敗", err)
                reject(err)
            })
        })
    }

    /**
     * 上傳使用者頭貼
     * @param {string} username
     */
    static upload_image(imgRef, username) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE user SET imgRef = ? WHERE username = ?"

            this.query(sql, [imgRef, username])
            .then(results => {
                console.log("資料庫照片路徑已更新")
                resolve(results.affectedRows)
            })
            .catch(err => {
                console.log("資料庫圖片路徑更新失敗")
                reject(err)
            })
        })
    }
};

