const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload'); // used for our submit form
const session = require('express-session'); // used for our submit form
const cookieParser = require('cookie-parser'); // used for our submit form
const connectFlash = require('connect-flash');// used for our submit form
const methodOverRide = require('method-override')
// create express app
const app = express();

//require foodRoutes
const foodRoutes = require('./routes/foodRoutes');
// port number
const port = process.env.PORT || 3000;

// require dotenv
// require('dotenv').config();

// db connection string
const dbURI = '//place your connection string here from mongodb atlas';
// connect to mongodb;
mongoose.connect(dbURI)
.then(()=>{
    // console.log('connected to mongodb');
    app.listen(port, ()=> console.log(`listening to request on port ${port}`));
})

.catch((err)=>{
   console.log(err);
})

// use static files
app.use(express.static('public'));

// use express.url encoded to grab form values
app.use(express.urlencoded({extended: true})); // turns your form data into a workable format.

// use override
app.use(methodOverRide('_method'));

// use ejs layout
app.use(expressLayouts);
// set ejs layout
app.set('layout', './layouts/general_layout');

// use cookie-parser
app.use(cookieParser('myBestFoodBlogSecret')); 
// use express sessions
app.use(session({
    secret: 'myBestFoodBlogSecret4Session',
    saveUninitialized: true,
    resave: true
}));
// use connect flash
app.use(connectFlash());
// use fileupload
app.use(fileUpload());


// set view engine
app.set('view engine', 'ejs');


// Routes or Navigations
app.use(foodRoutes);



// listen for request
// app.listen(port, ()=> console.log(`listening to request on port ${port}`));