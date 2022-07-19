const { request, response } = require("express")
const { Categoria } = require('../models');


//Obtener categorias - Paginado - Total - populate( mongoose )

const obtenerCategorias = async ( req = request, res = response ) => {

    try{
        const { limite = 5, desde = 0, hasta = 5 } = req.query;

        const query = { estado: true };

        const [ total, categorias, usuario ] = await Promise.all([
            Categoria.countDocuments( query ),
            Categoria.find( query   ).skip ( Number( desde )  ).limit( Number( limite ) ).populate('usuario', 'nombre')
        ]);


        return res.status( 200 ).json( {
            total,
            categorias
        });



    }   catch( err ){
        return res.status( 400 ).json( `Error al obtener categorias :${ err }`)
    };
};


//Obtener categoria - Populate ( Devuelve solo una categoria )


const obtenerCategoria = async ( req = request, res = response ) => {

    try{

        const categoria = await Categoria.findById( req.params.id ).populate('usuario', 'nombre');


        return res.status(201).json( categoria );
    }

    catch ( err ){
        return res.status( 400 ).json(`Error al obtener una categoria con el id ${ req.query }, error: ${ err }`);
    }
}


//Actualizar categoria - Editar nombre


const actualizarCategoria = async ( req = request, res = response ) =>{


    try{

        const { usuario, nombre, ...categoriaEntrante } = req.body;
        const { id } = req.params;

        
        categoriaEntrante.nombre = nombre.toUpperCase();
        categoriaEntrante.usuario= req.usuario;

        const categoria = await Categoria.findByIdAndUpdate( id, categoriaEntrante, { new: true } );


        return res.status( 200 ).json({
            categoria
        });

    } catch( err ){

        return res.status( 400 ).json(`Error al actualizar categoria: ${ err }`)
    }
    
}

//Borrar categoria - Validar el JWT - Cambiar el estado a false - Verificar id y cosas asi

const eliminarCategoria = async ( req = request, res = response ) => {


    try{

        const { id } = req.params;


        const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

        return res.status( 200 ).json({
            categoria
        })

    } catch ( err ){
        return res.status( 400 ).json(`Error al borrar categoria: ${ err }`);
    }
}



//Crear categoria


const crearCategoria = async ( req = request, res = response ) => {


    try{
        const nombre = req.body.nombre.toUpperCase();

        
        const categoriaDB = await Categoria.findOne( { nombre } );

        
        if( categoriaDB !==  null ) return res.status( 400 ).json({
            msg: `La categoria ${  categoriaDB.nombre } ya existe`
        });




        //Generar la data a guardar

        const data = {
            nombre,
            usuario: req.usuario._id
        }


        const categoria = new Categoria( data );


        //Guardar DB

        await categoria.save();

        return res.status( 201 ).json( categoria );

    } catch( err ){
        console.log( err )
        return res.status( 400 ).json(`Error al crear categoria ${ err }`);
    }
    
};


module.exports = {
    crearCategoria      ,
    obtenerCategorias   ,
    obtenerCategoria    , 
    actualizarCategoria ,
    eliminarCategoria
}