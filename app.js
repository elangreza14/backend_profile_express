const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const articleControllers = require('./controllers/articleControllers')

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

articleControllers(app,Article)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))