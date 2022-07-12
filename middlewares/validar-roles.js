const { response, request } = require("express")

const esAdminRole = ( req = request, res = response, next ) => {


    if( !req.usuario ) return res.status( 500 ).json({ msg: 'Hable con el administrador - Se quiere verificar el rol sin validar token antes'})

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ) return res.status( 401 ).json({ msg: `${ nombre } no es administrador - No puede realizar esta accion`})
    next();
}




const tieneRole = ( ...roles  ) =>{

    return ( req = request, res = response, next ) =>{


        if( !req.usuario ) return res.status( 500 ).json({ msg: 'Hable con el administrador - Se quiere verificar el rol sin validar token antes'})
         

        if( !roles.includes( req.usuario.rol ) ) res.status( 401 ).json({ msg: `El servicio requiere alguno de estos roles ${ roles }`})
        next();
    }
};

module.exports = {
    esAdminRole,
    tieneRole
}