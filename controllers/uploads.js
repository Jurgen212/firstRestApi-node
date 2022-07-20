
const { request, response } = require("express");


const path      = require('path');
const fs        = require('fs')  ;


const { subirArchivo }      = require('../helpers') ;
const { Usuario, Producto } = require('../models')  ;

const cloudinary = require('cloudinary').v2;

cloudinary.config( process.env.CLOUDINARY_URL );


const cargarArchivo =  async ( req = request, res = response ) => {

    try{

        const nombre = await subirArchivo( req.files, undefined , 'imgs' );
        res.json({
            nombre
        })

    } catch( err ){

        res.status( 400 ).json({ err });
    }    
};


const actualizarImagen = async ( req = request, res = response ) =>{

    const { id, coleccion } = req.params;


    let modelo;

    switch ( coleccion ) {
        case 'usuarios':

            modelo = await Usuario.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe usuario con id: ${ id }`);


        break;
    
        case 'productos':


            modelo = await Producto.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe producto con id: ${ id }`);


        break;

        default:

        return res.status( 500 ).json({ msg:'Se me olvido validar esto '})
            break;
    }

    //Limpiar imagenes previas
    
    if( modelo.img ){

        //Hay que borrar la img del servidor

        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        
        if( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }
    }


    modelo.img = await subirArchivo( req.files, undefined, coleccion );

    await modelo.save();

    return res.json({
        modelo
    })
};






const actualizarImagenCloudinary = async ( req = request, res = response ) =>{

    const { id, coleccion } = req.params;


    let modelo;

    switch ( coleccion ) {
        case 'usuarios':

            modelo = await Usuario.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe usuario con id: ${ id }`);
        break;
    
        case 'productos':


            modelo = await Producto.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe producto con id: ${ id }`);


        break;

        default:

        return res.status( 500 ).json({ msg:'Se me olvido validar esto '})
            break;
    }

    //Limpiar imagenes previas
    
    if( modelo.img ){
        
        const nombreArr = modelo.img.split('/');
        const nombre    = nombreArr[ nombreArr.length - 1 ];

        const [ public_id ]   = nombre.split('.');

        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(  tempFilePath );
    modelo.img = secure_url;
    
    await modelo.save();    
    return res.json( { modelo });
    
};





const mostrarImagen = async ( req = request, res = response ) =>{

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':

            modelo = await Usuario.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe usuario con id: ${ id }`);
        break;
    
        case 'productos':

            modelo = await Producto.findById( id );
            if( !modelo ) return res.status( 400 ).json(`No existe producto con id: ${ id }`);
        break;

        default:
        return res.status( 500 ).json({ msg:'Se me olvido validar esto '})
            break;
    }

    //Limpiar imagenes previas
    
    if( modelo.img ){

        //Hay que borrar la img del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        
        if( fs.existsSync( pathImagen ) ) {
            
            return res.status( 200 ).sendFile( pathImagen );
        }
    }

    const pathNoImage = path.join( __dirname, '../assets', `no-image.jpg`);
    res.status( 400 ).sendFile( pathNoImage );
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}