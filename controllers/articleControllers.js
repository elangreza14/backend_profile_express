module.exports = function (app, Article) {
    app.get('/article', function (req, res) {
        Article.find({}, function (err, articles) {
            if (err) {
                console.log(err)
            } else {
                res.json(articles)
            }
        })
    })

    app.post('/article', function (req, res) {
        let article = new Article()
        article.title = req.body.title
        article.author = req.body.author
        article.body = req.body.body
        article.save(function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                res.json({ status: 200, message: "success" })
            }
        })
    })
}