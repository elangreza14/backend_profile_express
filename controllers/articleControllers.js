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

    app.get('/article/:id', function (req, res) {
        Article.findById(req.params.id, function (err, articles) {
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

    app.post('/article/edit', function (req, res) {
        let article = {}
        article.title = req.body.title
        article.author = req.body.author
        article.body = req.body.body
        let query = { _id: req.body._id }

        Article.update(query, article, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                res.json({ status: 200, message: "success update" })
            }
        })
    })

    app.post('/article/delete/:id', function (req, res) {
        let query = { _id: req.params.id }
        Article.remove(query, function (err) {
            if (err) {
                console.log(err)
                return
            } else {
                res.json({ status: 200, message: "success delete" })
            }
        })
    })
}