const express = require('express')
const port = process.env.PORT || 2077
const { urlencoded, json } = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser');

// Inizialization
const app = express()

//setting
app.set('port', port)

// middlewares
app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes 

app.use('/', require('./routes/games.routes'))
app.use('/', require('./routes/development.routes'))
app.use('/', require('./routes/gendersroutes'))


// public static files
app.use(express.static(path.join(__dirname, '../static')))
app.use('/static', express.static('static'));

app.set('view engine', 'ejs');

module.exports = app