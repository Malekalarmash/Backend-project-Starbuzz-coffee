if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
//const users = Sequelize.import('./models/users');
const { starbuzzcoffee } = require('./models')
const ejs = require("ejs");
const { users } = require('./models')
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
//const sequelize = new Sequelize("sqlite::memory:");
//const { starbuzzcoffee } = require('./models')

const initializePassport = require('./passport-config')

initializePassport(
  passport,
  email => users.findOne({ where: { email: email } }),
  id => users.findOne({ where: { id: id } })
)


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// const sequelize = new Sequelize("sqlite::memory:");
app.use(express.static("public"))
app.use(bodyParser.json())

// Use this function to bulk delete 
async function bulkDelete() {
    const product = await starbuzzcoffee.destroy({ where: { id: [11, 18, 17] } })
    console.log(product)
}
// bulkDelete()

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

app.get('/home', (req, res) => {
    res.render('index.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {

    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        
        const post = await users.create({ name: req.body.name , email: req.body.email , password: hash });
        //const post = await users.create
        res.redirect('/login')
        //res.send(post)
    });
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
 successRedirect: '/home',
 failureRedirect: '/login' ,
 failureFlash: true
}))

app.listen(port = 5430, () => {
    console.log("App is running on port", port)
})