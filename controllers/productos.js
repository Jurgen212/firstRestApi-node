const { response } = require("express");

const { Producto, Categoria } = require('../models');


const obtenerProductos = async ( req = require, res = response ) => {

    try{

        const { limite = 5, desde = 0, hasta = 5 } = req.query;

        const query = { estado: true };

        const [ total, producto, usuario, categoria ] = await Promise.all([
            Producto.countDocuments( query ),
            Producto.find( query   ).skip ( Number( desde )  ).limit( Number( limite ) ).populate('usuario', 'nombre').populate('categoria', 'nombre')
        ]);


        return res.status( 200 ).json( {
            total   , 
            producto,
            usuario ,
            categoria
        });

        
    } catch( err ){

        res.status( 400 ).json(`Error al obtener productos Error: ${ err }`);
    };
};




const obtenerProducto = async ( req = require, res = response ) => {


    try{

        const producto = await Producto.findById( req.params.id );
        res.status( 200 ).json( producto );

    } catch( err ){

        res.status( 400 ).json(`Error al obtener producto Error: ${ err }`);
    };
}






const crearProducto = async ( req = require, res = response ) => {

    try{

        const { ...data } = req.body;

        data.usuario    = req.usuario._id;
        data.categoria  = await Categoria.findOne( { categoria: data.categoria } );

        const producto = new Producto( data );

        
        await producto.save();

        res.status( 200 ).json({
            data
        });

    } catch( err ){

        res.status( 400 ).json(`Error al crear producto Error: ${ err }`);
    };
}






const actualizarProducto = async ( req = require, res = response ) => {


    try{


        const { usuario, ...body } = req.body;

        body.usuario = req.usuario.id;
        body.categoria = await Categoria.findOne({ categoria: body.categoria });

        const producto = await Producto.findByIdAndUpdate(  req.params.id, body, { new: true }).populate('categoria', 'nombre').populate('usuario','nombre');
        
        
        res.status( 200 ).json( producto );

    } catch( err ){

        res.status( 400 ).json(`Error al actualizar producto Error: ${ err }`);
    };
};




const eliminarProducto = async ( req = require, res = response ) => {

    try{


        const id = req.params.id;
        const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true });

        res.status( 200 ).json({
            msg: `Producto ${ producto.nombre } deshabilitado`
        });
    } catch( err ){

        res.status( 400 ).json(`Error al eliminar producto Error: ${ err }`);
    };
}

module.exports = {
    obtenerProductos    ,
    obtenerProducto     ,
    crearProducto       ,
    actualizarProducto  ,
    eliminarProducto
}