//import core libraries
const http = require('http')

//import npm libraries


//import local libraries
const app = require('./app.js')


//const port = process.env.PORT || 3000
const port = 8080

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`listens to ${port}`)
})