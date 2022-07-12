const { Router } = require( 'express' )         ;
const { check  } = require('express-validator') ;



const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId }    = require('../helpers/db-validators');


const { validarCampos, validarJWT, esAdminRole, tieneRole  } = require('../middlewares');


const router = Router();


router.get('/', usuariosGet         );


router.put('/:id', [
    check('id', 'No es un id valido').isMongoId()   ,
    check('id').custom( existeUsuarioPorId )        ,
    validarCampos
] ,usuariosPut         );




router.post('/', [
    check('nombre'  , 'El nombre es obligatorio')                   .not().isEmpty()        ,
    check('password', 'El password debe tener minimo 6 caracteres') .isLength( { min: 6 })  ,
    check('correo'  , 'El correo no es valido')                     .isEmail()              ,
    check('correo'  )                                               .custom( emailExiste )  ,
    // check( 'rol'    , 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE'])        ,
    check('rol').custom( esRoleValido )                                                     , //( rol ) => esRolValido( rol ) es lo mismo a lo que usamos

    validarCampos
],  usuariosPost);



router.delete('/:id',[
    validarJWT                                      ,
    // esAdminRole                                     ,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE')          ,
    check('id', 'No es un id valido').isMongoId()   ,
    check('id').custom( existeUsuarioPorId )        ,
    validarCampos
], usuariosDelete   );


router.patch('/', usuariosPatch     );


module.exports = router;