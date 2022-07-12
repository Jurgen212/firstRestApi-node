
const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario.js');

const validarJWT = async ( req = request, res = response, next ) =>{

    const token = req.header('x-token');


    if( !token ){
        return res.status( 401 ).json({
            msg:'No hay token en la peticion'
        }); 
    }



    try{
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        
        const usuario = await Usuario.findById( uid );



        //Verificar si existe el usuario


        if( !usuario ) return res.status( 401 ).json({ msg: 'Token no valido - Usuario no existe en db' })          ;

        //Verificar si el UID tiene estado en true
        if( !usuario.estado ) return res.status( 401 ).json({ msg: 'Token no valido - Usuario con estado false' })  ;

        req.usuario = usuario;

        next();
    }
    catch( err ){

        console.log( err );

        res.status( 401 ).json({
            msg:'Token no valido'
        })
    };
};


module.exports = {
    validarJWT
};