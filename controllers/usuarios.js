const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');


const getUsuarios = async(req = request, res = response) => {
    //const {nombre, identificacion} = req.query;
    const { limit = 5, offset=0 } = req.query;

    const query = { state: true };

    // const usuario = await Usuario.find( query )
    // .skip(Number( offset ))
    // .limit(Number( limit ));

    // const totalUser = await Usuario.countDocuments( query );

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( query )
            .skip(Number( offset ))
            .limit(Number( limit )),
        Usuario.find( query )
            .skip(Number( offset ))
            .limit(Number( limit ))
    ])

    res.json({
        /*msg: 'get API - controlador.',
        nombre,
        identificacion*/
        total,
        usuarios
    })
}

const postUsuarios = async(req = request, res = response) => {

    const {name, email, password, rol} = req.body;
    const usuario = new Usuario( {name, email, password, rol} );

    // Encryptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //Guardar en la DB
    await usuario.save();

    res.json({
        msg: 'post API - Imprime usuario',
        usuario
    });
}

const putUsuarios = async(req=request, res = response) => {
    const { id } = req.params;

    const { _id, password, google, ...updateData } = req.body

    if (password) {
        // Encryptar la contraseña
        const salt = bcrypt.genSaltSync();
        updateData  .password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, updateData );

    res.json({
        msg: 'put API - controlador.',
        usuario
    })
}

const deleteUsuarios = async(req, res = response) => {

    const { id } = req.params; 

    //fisicamente lo borramos
    // const usuarios = await Usuario.findByIdAndRemove(id);

    // if (usuarios) {
    //     msg = 'Usuario eliminado';
    // }else{
    //     msg = 'Error al eliminar';
    // }

    const usuarios = await Usuario.findByIdAndUpdate(id, {state: false});

    res.json({
        id,
        usuarios
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}