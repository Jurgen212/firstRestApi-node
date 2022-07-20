

const validarJWT            = require('../middlewares/validar-jwt')     ;
const validarCampos         = require('../middlewares/validar-campos')  ;
const esAdminRole           = require('../middlewares/validar-roles')   ;
const tieneRole             = require('../middlewares/validar-roles')   ;
const validarArchivoSubir   = require(`../middlewares/validarArchivo`)  ;



module.exports = {
    ...validarJWT      ,
    ...validarCampos   ,
    ...esAdminRole     ,
    ...tieneRole       ,
    ...validarArchivoSubir
}