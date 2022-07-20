const { request, response } = require("express")


const validarArchivoSubir = ( req = request, res = response, next ) =>{

    if (    !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).send('No hay archivos que subir -- Archivo ( body )');
    };
    next();
};

module.exports = {
    validarArchivoSubir
} 