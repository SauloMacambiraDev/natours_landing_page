const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const path = require('path')
const express = require('express')
const app = express()

// Modules from server
const router = require('./routes')
const hbsHelpers = require('./utils/hbsHelpers')
const viewController = require('./controllers/viewController')

app.use(express.json())
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))

if (process.env.NODE_ENV.trim() == 'development') app.use(morgan('dev'))

// Routes
app.use(router)

// Setting Template Engine - HandlebarsJs

app.engine('.hbs', hbs({
    layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
    partialsDir: path.resolve(__dirname, 'views', 'partials'),
    extname: '.hbs', 
    defaultLayout: 'main',
    helpers: hbsHelpers
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.all('*', viewController.notFound)

module.exports = app