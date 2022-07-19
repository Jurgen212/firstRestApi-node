const { Router, json } = require( 'express' )           ;
const { check  } = require('express-validator')         ;

const { validarCampos, validarJWT } = require('../middlewares');

const router = Router();

const { obtenerProductos,
        obtenerProducto ,
        crearProducto   ,
        actualizarProducto,
        eliminarProducto } = require('../controllers/productos.js');

const { nombreCategoriaExiste,
        nombreProductoExiste, 
        existeProductoId} = require('../helpers/db-validators');


//Obtener todos los productos - Publico
router.get('/', [ 
    validarCampos ], 
    obtenerProductos );



//Obtener una producto con id - Publico 
router.get('/:id', [
    check('id', 'No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
], obtenerProducto );




//Crear un nuevo Producto - Privado ( Cualquiera con un token valido )
router.post('/', [ 
    validarJWT,
    check('nombre'      , 'El nombre del producto es obligatorio')  .not().isEmpty(),
    check('categoria'   ,'La categoria del producto es obligatoria').not().isEmpty(),
    check('categoria').custom( nombreCategoriaExiste )                              ,
    check('nombre').custom( nombreProductoExiste )                                  ,
    validarCampos
],  crearProducto );


//Actualizar registro con un id - Privado
router.put('/:id', [
    validarJWT,
    check('id','No es id valido de Mongo').isMongoId()          ,
    check('nombre', 'El nombre es obligatorio').not().isEmpty() ,
    check('id').custom( existeProductoId )                      ,
    check('nombre').custom( nombreProductoExiste )              ,
    check('categoria').custom( nombreCategoriaExiste )          ,
    validarCampos   

], actualizarProducto );



//Borrar una categoria con id - Privado
router.delete('/:id',  [
    validarJWT,
    check('id','El id es obligatorio').not().isEmpty(),
    check('id','No es un id valido de Mongo').isMongoId(),
    check('id').custom( existeProductoId ),
    validarCampos
], eliminarProducto);




module.exports = router;