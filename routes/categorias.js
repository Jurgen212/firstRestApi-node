const { Router, json } = require( 'express' )           ;
const { check  } = require('express-validator')         ;

const { validarCampos, validarJWT } = require('../middlewares');

const { crearCategoria      , 
        obtenerCategorias   , 
        obtenerCategoria    , 
        actualizarCategoria , 
        eliminarCategoria } = require('../controllers/categorias');

const { existeCategoriaPorId, nombreExiste } = require('../helpers/db-validators');

const router = Router();



// /api/categorias/



//Todos los que tengan id, tengo que validar el id de la categoria check(xxx).custom( existeCategoria ) crear en los helpers/db-validators


//Obtener todas las categorias - Publico
router.get('/', [ 
    validarCampos ], 
    obtenerCategorias );



//Obtener una categoria con id - Publico 
router.get('/:id', [
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos

],obtenerCategoria);




//Crear una nueva categoria - Privado ( Cualquiera con un token valido )
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],  crearCategoria );


//Actualizar registro con un id - Privado
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre').custom( nombreExiste ),
    check('nombre', 'El nombre es oblgatorio').not().isEmpty(),
    validarCampos

], actualizarCategoria );



//Borrar una categoria con id - Privado
router.delete('/:id',  [
    validarJWT,
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], eliminarCategoria);




module.exports = router;