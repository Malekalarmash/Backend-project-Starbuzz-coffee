if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { users } = require('./models')
const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const sequelize = new Sequelize("sqlite::memory:");

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

app.get('/home', (req, res) => {
    res.render('index.ejs', {name: req.user.name})
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {

    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        
        const post = await users.create({ name: req.body.name , email: req.body.email , password: hash });
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

app.listen(port = 3000, () => {
    console.log("App is running on port", port)
})