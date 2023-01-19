const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const app = express()
const port = 4000

dotenv.config({path: './../.env'})
const DB = process.env.DB

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(con => {
    console.log('Server-DB Connection Successful!')
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})