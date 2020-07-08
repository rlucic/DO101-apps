//import core libraries
const path = require('path')
//import npm libraries
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const hbs = require('hbs')
//import local libraries
const genericRouter = require('./routers/genericRouter')

//confugure directories
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ==== START CONFIGURATION ====
//create and configure express app
const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
//customize express to use handlebars as templating engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//set partials for handlebars
hbs.registerPartials(partialsPath)

//customize express to serve static files
app.use(express.static(publicPath))
//  confugure to use the routers
app.use('/api-qrcode', genericRouter)

// ==== END CONFIGURATION
 
//set the route for the home page
//renders from the handlebars views engine
app.get('', (req, res) => {
    //pass the variables for header and footer
    res.render('index', {
        title: 'QRCode App',
        name: 'RGL'
    })
})

module.exports = app