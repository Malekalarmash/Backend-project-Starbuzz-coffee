const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send("Okay")
})

app.post('/', (req, res) => {

})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

})

app.get('/', (req, res) => {

})

app.listen(port = 3000, () => {
    console.log("App is running on port", port)
})