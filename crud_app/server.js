const express = require('express');
const dotenv = require('dotenv');  //This module allows us separate secret from our source code
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const router = require('./server/routes/router');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

app.use(morgan('tiny'));  // log requests

// mongodb connection
connectDB();

app.use(bodyparser.urlencoded({ extended : true}))   // parse request to body-parser

app.set("view engine", "ejs")   // To set view engine

// loading assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', router)


app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});