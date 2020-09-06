const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/nodekb')
let db = mongoose.connection

db.once('open', function () {
    console.log('connected to mongo db')
})

db.on('error', function (err) {
    console.log(err)
})

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let Article = require('./models/article')

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))