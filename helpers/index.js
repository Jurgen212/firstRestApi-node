

const dbValidator   = require('./db-validators')    ;
const generarJWT    = require('./generar-jwt.js')   ;
const googleVerify  = require('./google-verify.js') ;
const subirArchivo  = require('./subir-archivo.js') ;



module.exports = {
    ...dbValidator ,
    ...generarJWT  ,
    ...googleVerify,
    ...subirArchivo
}
