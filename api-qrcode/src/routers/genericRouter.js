//import core libraries


//import npm libraries
const express = require('express')
const moment = require('moment')

//import local libraries
const sampleAuth = require('../middleware/sampleMiddleware')
const { qrCodeAsDataURI } = require('../genQRCode')

const dateFormat = 'DD-MM-YYYY : hh:mm:ss'

const genericRouter = express.Router()


genericRouter.get('', (req, res) => {
    res.send('...')
})


genericRouter.get('/ping', (req, res) => {
    const renv = process.env.NODE_ENV


    const host = process.env.HOSTNAME || process.env.hostname || 'localhost'
    const now = moment(new Date()).format(dateFormat)
    const sendBack = {
        'message': 'Response from api-qrcode/ping: pong',
        'environment': renv,
        'running on': host,
        '@': now
    }
    console.log(sendBack)
    res.setHeader('Content-Type', 'application/json')
    res.send(sendBack)
})

/**
 * 
 */
genericRouter.get('/sample', async (req, res) => {
    try {
        var img64 = await qrCodeAsDataURI('sample from api-qrcode')
        console.log(img64)
        res.setHeader('Content-Type', 'text/html')
        res.send(`<img src=${img64}>`)
    } catch (err) {
        console.log(err)
    }
})

/**
 * generates a QRCode in an image data or Base64 encoded image
 */
genericRouter.post('/generate', sampleAuth, async (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.text) {
        return res.status(400).send({ 'error': 'post a JSON like: text=value' })
    }
    var accept = req.accepts(['text/plain', 'text/html'])
    console.log(accept)
    try {
        if (accept === false){
            return res.status(406).send()
        }
        var img64 = await qrCodeAsDataURI(body.text)
        if (accept.indexOf('html') >= 0) {
            console.log('Accepts text/html')
            console.log(accept.indexOf('html'))
            res.setHeader('Content-Type', 'text/html')
            res.send(`<img src=${img64}>`)
        }
        else if (accept.indexOf('plain') >= 0) {
            console.log('Accepts text/plain')
            var idx = img64.indexOf('base64')
            res.setHeader('Content-Type', 'text/plain')
            return res.send(img64.substring(idx+7))
            //throw new Error('something went wrong')
        }

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.toString())
    }
    //res.send({ 'message': 'received: ' + JSON.stringify(body) })
})

module.exports = genericRouter