
const { response, request } = require('express');

const usuariosGet = (req = request, res = response ) => {



    const { q, nombre = 'No name', apiKey } = req.query;

    res.json({
        msg : "Get API",
        q              ,
        nombre         ,
        apiKey
    });
};



const usuariosPut = (req, res = response ) => {

    const { id }  = req.params;
     
    res.status( 500 ).json({
        msg : "put API",
        id             
    });

};




const usuariosPost = (req, res = response ) => {


    const { nombre, edad } = req.body;

    res.status(201).json({
        msg : "post API",
        nombre          ,
        edad
    });
};



const usuariosDelete =  (req, res = response ) => {

    res.json({
        msg : "delete API"
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