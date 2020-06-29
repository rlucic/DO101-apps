//import core libraries
const http = require('http')

//import npm libraries


//import local libraries
const app = require('./app.js')


//const port = process.env.PORT || 3000
const port = 8080
const key1 = process.env.key1

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`listens to ${port}`)
    if(!key1){
        console.log('Need to define env var key1')
    }
    else{
        console.log(`key1 value: ${key1}`)
    }
})