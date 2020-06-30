//import core libraries


//import npm libraries
const express = require('express')
const moment = require('moment')
const QRCode = require('qrcode')

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

genericRouter.post('/image', sampleAuth, async (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.text) {
        return res.status(400).send({ 'error': 'post a JSON like: text=value' })
    }
    var accept = req.accepts(['image/png'])
    console.log('Accept: ', accept)
    if (accept === false) {
        return res.status(406).send('wrong Accept header, Works only with image/png')
    }
    try {
        if (accept.indexOf('image/png') >= 0) {
            res.setHeader('Content-Type', accept)
            return await QRCode.toFileStream(res, body.text)
        }
        //return res.send('wrong Accept header, Works only with image/png')
    } catch (error) {
        console.log(error)
        return res.status(400).send(error.toString())
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
    console.log('Accept: ', accept)
    try {
        if (accept === false) {
            return res.status(406).send()
        }

        if (accept.indexOf('html') >= 0) {
            var img64 = await qrCodeAsDataURI(body.text)
            console.log('Accepts text/html')
            console.log(accept.indexOf('html'))
            res.setHeader('Content-Type', accept)
            res.send(`<img src=${img64}>`)
        }
        //console.log('not text/html')
        else if (accept.indexOf('plain') >= 0) {
            var img64 = await qrCodeAsDataURI(body.text)
            console.log('Accepts text/plain')
            var idx = img64.indexOf('base64')
            res.setHeader('Content-Type', accept)
            return res.send(img64.substring(idx + 7))
            //throw new Error('something went wrong')
        }

    } catch (error) {
        console.log(error)
        return res.status(400).send(error.toString())
    }
    //res.send({ 'message': 'received: ' + JSON.stringify(body) })
})

module.exports = genericRouter