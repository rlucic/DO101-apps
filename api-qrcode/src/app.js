//import core libraries


//import npm libraries
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

//import local libraries
const genericRouter = require('./routers/genericRouter')

//create and configure express app
const app = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())

//  confugure to use the routers
app.use('/api-qrcode', genericRouter)



module.exports = app