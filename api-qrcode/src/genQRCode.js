
const QRCode = require('qrcode')

const qrCodeAsString = async (text) =>{
    try{
        var qr = await QRCode.toString('sample text', {type: 'terminal'})
        console.log(qr)
        return qr
    } catch (err){
        console.log('err')
    }
}


const qrCodeAsDataURI = async (text) =>{
    try{
        var qr = await QRCode.toDataURL(text)
        //console.log(qr)
        var idx = qr.indexOf('base64')
        var toReturn = qr.substring(idx+7)
        //console.log(toReturn)
        return qr
    } catch (err){
        console.log('err')
    }
}

//const myqr = qrCodeAsString('Sample text.....')
//qrCodeAsDataURI('some text')

module.exports = {
    qrCodeAsDataURI
}
