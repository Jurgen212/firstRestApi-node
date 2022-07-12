const { response, request } = require('express')             ;
const bcryptjs = require('bcrypt');

const Usuario = require('../models/usuario.js');
const usuario = require('../models/usuario.js');



const usuariosGet = async (req = request, res = response ) => {
    
    const { limite = 5, desde = 0, hasta = 5 } = req.query;

    const query = { estado: true }


    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip( Number( desde ) )
        .limit( Number( limite ) )
    ]);


    res.status(200).json({
        total,
        usuarios
    });
};



const usuariosPut = async (req, res = response ) => {

    const { id }                                    = req.params;
    const { _id, password, google, correo, ...user }= req.body  ; 


    //TODO validar contra base de datos

    if( password ){

        const salt      = bcryptjs.genSaltSync()                ;
        user.password   = bcryptjs.hashSync( password, salt )   ;
    };


    const usuario = await Usuario.findByIdAndUpdate( id, user, { new: true } );

    res.status( 201 ).json({
        id,
        usuario             
    });

};




const usuariosPost = async (req, res = response ) => {

    const { nombre, correo, password, rol } = req.body                                          ;
    const usuario                           = new Usuario( { nombre, correo, password, rol } )  ;
    
    
    //Encriptar la contraseña
    const salt          = bcryptjs.genSaltSync();
    usuario.password    = bcryptjs.hashSync( password, salt );

    //Guardar en DB
    await usuario.save()    ;
    
    res.status(201).json({
        usuario
    });
};





const usuariosDelete =  async (req, res = response ) => {

    const { id } = req.params;

    const uid = req.uid;

    //Eliminarlo fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );


    res.json({
        uid,
        usuario
    });
};






const usuariosPatch = (req, res = response ) => {

    res.json({
        msg : "Patch API"
    });
}


module.exports = {
    usuariosGet     ,
    usuariosPut     ,
    usuariosPost    ,
    usuariosDelete  ,
    usuariosPatch
};