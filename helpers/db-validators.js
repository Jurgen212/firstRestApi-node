const { Categoria, Producto } = require('../models/index.js');
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


const existeCategoriaPorId = async ( _id = '' ) => {
    const existeCategoria = await Categoria.findById( _id );

    if( !existeCategoria ) throw new Error(`Categoria con el id ${ _id } no existe `);
};




const nombreExiste = async ( nombre = '' )=>{
    const nombreExiste = await Categoria.findOne({ nombre });
    if( nombreExiste ) throw new Error(`Categoria con el nombre: ${ nombre }, ya existe`);
}



const nombreCategoriaExiste = async ( nombre = '' ) =>{
    
    const nombreExiste = await Categoria.findOne({ nombre });
    if( !nombreExiste ) throw new Error(`Categoria con el nombre: ${ nombre } no existe`);
}


const existeProductoId = async ( id = '' ) =>{
    
    const productoId = await Producto.findById(id );
    if( !productoId ) throw new Error(`Producto con el Id ${ id } no existe` );
}

const nombreProductoExiste = async ( nombre = '' ) =>{
    const nombreExiste = await Producto.findOne({ nombre });
    if( nombreExiste ) throw new Error(`Producto con el nombre: ${ nombre } ya existe`);
}

module.exports = {
    esRoleValido        ,
    emailExiste         ,  
    existeUsuarioPorId  ,
    existeCategoriaPorId,
    nombreExiste        ,
    nombreCategoriaExiste,
    nombreProductoExiste,
    existeProductoId
}


