if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
<<<<<<< HEAD
const app = express();
const port = 3000;
const hostname = "localhost";
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const {starbuzzcoffee} = require('./models');
// const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// const sequelize = new Sequelize('sqlite::memory');


app.set('view engine', 'ejs')
=======
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

const initializePassport = require('./passport-config')

initializePassport(
  passport,
  email => users.findOne({ where: { email: email } }),
  id => users.findOne({ where: { id: id } })
)


app.set('view engine', 'ejs')
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
>>>>>>> 0d65440911e9dcbfefffa9832929cf0aed09b591
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

<<<<<<< HEAD
app.get('/', async (req, res) => {

    let myStore = await starbuzzcoffee.findAll();

    res.render('index', {item : myStore})
    //    res.send(myStore);
    // res.status(200).send("Okay")
})

app.get('/mycart', async (req, res) => {
    const myCart = await starbuzzcoffee.create({productName: req.body.productName, price: req.body.price, description: req.body.description, imageurl: req.body.imageurl})
    // res.send(myCart)
    res.render('mycart')
})
=======
// Use this function to bulk delete 
async function bulkDelete() {
    const product = await starbuzzcoffee.destroy({ where: { id: [11, 18, 17] } })
    console.log(product)
}
// bulkDelete()

app.get('/home', async (req, res) => {
    const product = await starbuzzcoffee.findAll()
    res.render('index.ejs', { item: product })
    //res.render('index.ejs')
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
>>>>>>> 0d65440911e9dcbfefffa9832929cf0aed09b591

app.get('/navbar', (req, res) => {

    res.render('partials/navbar')
})

app.get('/footer', (req, res) => {

    res.render('partials/footer')
})

app.post('/', async (req, res) => {
    const myCart = await starbuzzcoffee.create({productName: req.body.productName, price: req.body.price, description: req.body.description, imageurl: req.body.imageurl})
    // res.send(myCart)
    console.log(req.body)
        // let imageurl = req.body.imageurl;
        // let price = req.body.price;
        // let description = req.body.description;
        // let productName = req.body.productName;
        // let product = {imageurl:imageurl,price:price,description:description,productName:productName};
        res.redirect('/')
})

app.put('/', (req, res) => {

})

app.delete('/mycart/delete/:id', async (req, res) => {
    const id = req.params.id;
    let removeCoffee = await starbuzzcoffee.destroy({
        where: {id},
      });
      res.send(String(removeCoffee));
})

app.get('/home', (req, res) => {
    res.render('index.ejs')
})

<<<<<<< HEAD
function calculateTotal(item, req) {
    total = 0;
    for(let i=0; i<item.length; i++) {
        if(item[i].price) {
        total = total + (item[i].price * item[i] * quantity);
     }
    }
 }

 app.put('/mycart/change/:id', async (req, res) => {
    let myNewCoffee = await starbuzzcoffee.update(
        {productName: req.body.productName, price: req.body.price, description: req.body.description, imageurl: req.body.imageurl}, {
        where: {
        id : req.params.id,
        }
      });
        res.send(myNewCoffee)
    })

app.listen(port, hostname, ()=> {
    console.log(`Server running on: http://${hostname}:${port}`);
=======
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
>>>>>>> 0d65440911e9dcbfefffa9832929cf0aed09b591
})