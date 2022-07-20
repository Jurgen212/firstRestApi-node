const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios'  ,
    'categoria' ,
    'productos' ,
    'roles'
];



const buscarUsuarios = async( termino = ``, res = response ) =>{
    
    const esMongoId = ObjectId.isValid( termino );//true

    if( esMongoId ){
        const usuario = await Usuario.findById( termino );

        return res.status( 200 ).json( {
            
            results: ( usuario ) ? [ usuario ] : []
        } );
    };


    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [ { nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    
    return res.status( 200 ).json( {
            
        results: ( usuarios ) ? [ usuarios ] : []
    } );
};



buscarCategoria = async ( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ) {
        const categoria = await Categoria.findById( termino );
        return res.status( 200 ).json({ results: ( categoria ) ? [ categoria ] : [] } );
    }


    const regex = new RegExp( termino, 'i');
    const categoria = await Categoria.find({
        $and: [ { nombre: regex }, { estado: true }]
    });

    return res.status( 200 ).json({ results: ( categoria ) ? [ categoria ] : [] });
}



buscarProductos = async ( termino = '', res = response ) => {

    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ) {
        const productos = await Categoria.findById( termino );
        return res.status( 200 ).json({ results: ( productos ) ? [ productos ] : [] } );
    }


    const regex = new RegExp( termino, 'i');
    const productos = await Producto.find({
        $and: [ { nombre: regex }, { estado: true }]
    });

    return res.status( 200 ).json({ results: ( productos ) ? [ productos ] : [] });
};



const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;


    if( !coleccionesPermitidas.includes( coleccion ) ){
        
        return res.status( 400 ).json({
            msg: `Las colecciones permitidas: ${ coleccionesPermitidas }`
        })
    };


    switch( coleccion ){
        
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'categoria':
            buscarCategoria( termino, res );
        break;

        case 'productos':
            buscarProductos( termino, res );
        break;

        default:
            return res.status( 500 ).json({msg: 'Error de servidor, contacte con administrador'})
    }
}



module.exports = {
    buscar
}