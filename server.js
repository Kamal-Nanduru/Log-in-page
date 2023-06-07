const bodyparser = require('body-parser');
const session = require("express-session");
const { v4:uuidv4 } = require("uuid");

const router = require('./router');

// Getting Express in to the project !
const express = require('express');
const app = express();

const path = require('path')

// creating port 
const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// 2. Before we use below code we need to intialise the engine, to intialise engine we need to specify method called SET 
app.set('view engine','ejs');

// load static assets
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets',express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized: true
}))

app.use('/route', router);

//home route
app.get('/',(req,res) => {
    // 1. Now we will render that base.ejs in render method
    res.render('base', {title: "Login System"});
})

// To make server to listen on the port number 3000
app.listen(port, ()=>{console.log("Listening to the server on http://localhost:3000")});