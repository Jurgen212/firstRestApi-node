const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = ( files, extensionesValidas = [ 'png','jpg','jpeg','gif'], carpeta = '' ) => {


    return new Promise( ( resolve, reject ) =>{

        const  { archivo } = files;
        const nombreCortado= archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];


        if( !extensionesValidas.includes( extension )) reject( `La extension ${ extension } no es permitida, validas: ${ extensionesValidas }` );

        const nombreTemp = uuidv4() + '.' + extension;
        uploadPath = path.join( __dirname, '../uploads/' + carpeta + "/" + nombreTemp );


        
        archivo.mv( uploadPath, ( err ) => {

            if (err) {
                console.log( err );
                reject( err );
            }

            resolve( nombreTemp );
        });
    })
};

module.exports = {
    subirArchivo
}