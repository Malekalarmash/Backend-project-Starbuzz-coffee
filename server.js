const express = require('express')
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
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))

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

app.get('/', (req, res) => {

})

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
})