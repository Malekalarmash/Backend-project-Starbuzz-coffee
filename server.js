const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const { starbuzzcoffee } = require('./models')
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Use this function to bulk delete 
async function bulkDelete() {
    const product = await starbuzzcoffee.destroy({ where: { id: [7, 8, 9, 10] } })
    console.log(product)
}

app.get('/home', async (req, res) => {
    const product = await starbuzzcoffee.findAll()
    res.render('index', { item: product })
})
// Render the create listing page
app.get('/createListing', (req, res) => {
    res.render('createListing')
})
// Create a new product
app.post('/createListing', async (req, res) => {
    const { productName, price, description, imageurl } = req.body
    const newProduct = {
        productName: productName,
        price: price,
        description: description,
        imageurl: imageurl
    }
    console.log(req.body)
    await starbuzzcoffee.create(newProduct)
    res.redirect('/home')

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