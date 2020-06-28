//import core libraries


//import npm libraries
const express = require('express')
const moment = require('moment')

//import local libraries
const sampleAuth = require('../middleware/sampleMiddleware')

const dateFormat = 'DD-MM-YYYY : hh:mm:ss'

const genericRouter = express.Router()


genericRouter.get('', (req, res) => {
    res.send('.')
})


genericRouter.get('/ping', (req, res) => {
    const renv = process.env.NODE_ENV


    const host = process.env.HOSTNAME
    const now = moment(new Date()).format(dateFormat)

    res.send({ 'message': 'Response from ping: pong',
                'environment': renv,
                'hostname': host,
                '@': now })
})

genericRouter.post('', sampleAuth, async(req, res) => {
    const body = req.body
    console.log(body)

    if (!body.key){
        return res.status(400).send({'error': 'post a json like: key=value'})
    }
    res.send({'message': 'received: ' + JSON.stringify(body)})
})

module.exports = genericRouter