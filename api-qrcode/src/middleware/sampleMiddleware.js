//import core libraries


//import npm libraries


//import local libraries


const sampleAuth = async (req, res, next) => {
    console.log('Inside the middleware sampleAuth function')
    //continue the normal request processing
    next()
}


module.exports = sampleAuth