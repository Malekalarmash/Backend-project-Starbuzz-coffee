const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const { product } = require('./models')
const { cart } = require('./models')
const { cartItem } = require('./models')
const ejs = require("ejs");
const { users } = require('./models')
const bcrypt = require('bcrypt');
const logger = require('./logger')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./passport-config');
const { add } = require('winston');
const { get } = require('./routes/auth');
var SQLiteStore = require('connect-sqlite3')(session);
// app.use('/', get);
require('dotenv').config()
let errors = [];


function output(req, level, message) {
    logger.log({
        method: req.method,
        path: req.path,
        level: level,
        parameters: req.params,
        body: req.body,
        message: message,
        timestamp: Date.now()
    })

}

app.all('*', (req, res, next) => {
    logger.info({
        method: req.method,
        path: req.path,
        parameters: req.params,
        body: req.body,
        timestamp: Date.now()
    })
    next()
})

// Define the association between product model and cart model
// users.hasMany(cart)
// cart.belongsTo(users)
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
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'session.db', dir: './var/db' })
}))

app.use(passport.initialize())
app.use(passport.authenticate('session'));

app.use(express.static("public"))
app.use(bodyParser.json())
app.use('/css', express.static(__dirname + 'public/css'))



// Use this function to bulk delete 
// async function bulkDelete() {
//     const getProduct = await product.destroy({ where: { id: [1, 2, 3, 4] } })
//     // console.log(getProduct)
// }
// bulkDelete()

// Render the home page
app.get('/home', async (req, res) => {
    const getProduct = await product.findAll()
    const getUser = await users.findAll({
        where: {
            id: req.user.id
        }
    })
    res.render('index.ejs', { item: getProduct, user: getUser })
    // console.log(getUser)

})
// Render the create listing page
app.get('/createListing', (req, res) => {
    res.render('createListing')
})
// Render the product details page
app.get('/productDetails/:id', async (req, res) => {
    const id = req.params.id
    const products = await product.findOne({
        where: {
            id: id
        }
    })
    res.render('product-details', { product: products })
})

// Create a new product
app.post('/createListing', async (req, res) => {
    const { productName, price, description, imageurl } = req.body
    //let errors = [];

    if (!productName || !price || !description || !imageurl) {
        output(req, 'error', ' All fields are required')
        errors.push('All fields are required')
        res.render('createListing.ejs', { errors: errors })

    }

    else {
        const newProduct = {
            name: productName,
            price: price,
            des: description,
            imgUrl: imageurl
        }
        await product.create(newProduct)
        res.redirect('/home')
    }

})

app.get('/navbar', (req, res) => {

    res.render('partials/navbar')
})

app.get('/footer', (req, res) => {

    res.render('partials/footer')
})

// Render the cart page
app.get('/mycart/',
    passport.session({ failureRedirect: '/login' }),
    async (req, res) => {
        const getUserCart = await cart.findOne({
            where: {
                userId: req.user.id
            }
        })
        const cartItems = await cartItem.findAll({
            where: {
                cartId: getUserCart.id,
            },
            include: product
        })
        console.log(cartItems)
        // const addedProduct = await product.findAll({
        //     where: {
        //         cartId: pro
        //     }
        // })
        res.render('mycart', { addedToCart: cartItems })

    })

// Add item to the cart
app.post('/add-to-cart/:productId',
    // This will auth the user so they can add to the cart 
    passport.session({ failureRedirect: '/login' }),
    async (req, res) => {
        const productId = req.params.productId
        const userId = req.user.id
        const findUser = await users.findOne({ where: { id: userId } })
        const findCart = await cart.findOne({ where: { userId: userId } })
        const addedToCart = await cartItem.create({
            cartId: findCart.id,
            productId: productId
        })

        // console.log("++++++++", addedToCart)
        // await cart.create(addedToCart)
        res.redirect('/mycart')
    })

// Deleteing a cart item
app.post('/delete-cart/:id', async (req, res) => {
    const cartItemId = req.params.id
    const deleteCartItem = await cartItem.destroy({
        where: {
            id: cartItemId
        }
    })
    if (deleteCartItem === 0) {
        res.status(404).sendStatus('Id not found')
    }
    res.redirect('/mycart')
})

app.put('/', (req, res) => {

})

// app.delete('/mycart/delete/:id', async (req, res) => {
//     const id = req.params.id;
//     let removeCoffee = await product.destroy({
//         where: { id },
//     });
//     res.send(String(removeCoffee));
// })


function calculateTotal(item, req) {
    total = 0;
    for (let i = 0; i < item.length; i++) {
        if (item[i].price) {
            total = total + (item[i].price * item[i] * quantity);
        }
    }
}

app.put('/mycart/change/:id', async (req, res) => {
    let myNewCoffee = await product.update(
        { productName: req.body.productName, price: req.body.price, description: req.body.description, imageurl: req.body.imageurl },

        {
            where: {
                id: req.params.id,
            }
        });
    if (!myNewCoffee || !myNewCoffee[0]) {
        output(req, 'error', 'Coffee not found')
        return res.status(404).send('Coffee not found');
    }
    res.send(myNewCoffee);
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', async (req, res) => {
    const nameCheck = /^[a-zA-Z]+$/;
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, password } = req.body;
    //let errors = [];

    if (!name.match(nameCheck)) {
        output(req, 'error', 'Name should contain only letters')
        errors.push('Name should contain only letters');
        //res.status(400).send('Name should contain only letters');
    } else if (!email.match(emailCheck)) {
        output(req, 'error', 'Invalid email address')
        errors.push('Invalid email address');
        //res.status(400).send('Invalid email address');
    } else {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
                res.status(500).send('Internal Server Error')
            } else {
                const post = await users.create({ name, email, password: hash, carts: [{}] }, { include: cart });

                res.status(200).redirect('/login');
            }
        });
    }

    // res.render('register.ejs', { errors: errors });
});


app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.listen(port = 3000, () => {
    console.log("App is running on port", port)
})
