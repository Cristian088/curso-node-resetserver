const Roles = require('../models/roles');
const Usuario = require('../models/usuarios');

const esRolValido = async(rol = '') =>{
    const existRol = await Roles.findOne( { rol } );
    if ( !existRol ) {
        throw new Error(`El rol: ${rol} no esta registrado en la DB`);
    }
}

const emailExist = async(email = '') =>{ 

    const exitsEmail = await Usuario.findOne({ email });

    if (exitsEmail) {
        throw new Error(`El correo: ${email} ya esta registrado en la DB`);
    }
}

const idUserExist = async( id ) =>{ 
    const exitsId = await Usuario.findById( id );
    if (!exitsId) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExist,
    idUserExist
}