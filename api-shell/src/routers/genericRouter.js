//import core libraries


//import npm libraries
const express = require('express')

//import local libraries
const sampleAuth = require('../middleware/sampleMiddleware')


const genericRouter = express.Router()


genericRouter.get('', (req, res) => {
    res.send('.')
})


genericRouter.get('/ping', (req, res) => {
    const renv = process.env.NODE_ENV
    const host = process.env.HOSTNAME

    res.send({ 'message': 'Response from ping: pong',
                'environment': renv,
                'hostname': host })
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