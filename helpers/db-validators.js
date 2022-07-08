const    Role    = require('../models/role.js');
const Usuario    = require('../models/usuario.js');

 const esRoleValido = async (rol = '') => {
        
    const existeRol = await Role.findOne( {rol} );
    
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la DB`);
    };
};



const emailExiste = async ( correo = '') =>{

    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail ){
        throw new Error(`El correo ${ correo } ya se encuentra registrado`);
    };
};
    


const existeUsuarioPorId = async ( _id = '') =>{

    
    const existeUsuario = await Usuario.findById( _id );
    if( !existeUsuario ) throw new Error(`Usuario con el id ${ _id } no existe`);
};



module.exports = {
    esRoleValido      ,
    emailExiste       , 
    existeUsuarioPorId
}


