

const validarJWT    = require('../middlewares/validar-jwt')     ;
const validarCampos = require('../middlewares/validar-campos')  ;
const esAdminRole   = require('../middlewares/validar-roles')   ;
const tieneRole     = require('../middlewares/validar-roles')   ;


module.exports = {
    ...validarJWT      ,
    ...validarCampos   ,
    ...esAdminRole     ,
    ...tieneRole   
}