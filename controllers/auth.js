const { response, request, json }  = require("express")                ;
const bcryptjs      = require('bcrypt')                 ;

const Usuario           = require('../models/usuario.js')       ;
const { generarJWT }    = require("../helpers/generar-jwt.js")  ;
const { googleVerify }  = require('../helpers/google-verify')   ;  


const loginController = async ( req, res = response ) =>{
    
    const { correo, password } = req.body;


    try{


        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ) return res.status( 400 ).json({ msg:'El Usuario / Password no son correctos - Correo' });


        //Verificar si el usuario esta activo

        if( !usuario.estado ) return res.status( 400 ).json({ msg: 'La cuenta de este usuario se encuentra suspendida - Estado: false' });

        //Verificar la contraseña


        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ) return res.status( 400 ).json({ msg: 'Contraseña incorrecta - Password'});


        //Generar el JWT

        const token = await generarJWT( usuario.id );
        


        res.json({
            usuario,
            token
        });


    } catch( err ){

        console.log( err );
        return res.status(500).json({
            msg:'Hable con el administrador'
        });


    };
};




const googleSignIn = async ( req = request, res = response ) =>{

    const { id_token } = req.body;



    try{

        const { nombre, img, correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        if( !usuario ) {
            //Crear usuario
            
            const data = {
                
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };

            
            usuario = new Usuario( data );
            await usuario.save();
        }

        //Si el usuario en DB ya existe

        if( !usuario.estado ){
            
            return res.status( 401 ).json({
                msg:'Hable con el administrador, usuario desactivado'
            })
        }


        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        });

    } catch( err ){

        console.log( err )
        res.status( 400 ).json({
            msg:'Token no se pudo verificar',
            ok: false

        })
    }

    
}



module.exports = {
    loginController,
    googleSignIn
}