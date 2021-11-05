const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');


const getUsuarios = (req = request, res = response) => {
    const {nombre, identificacion} = req.query;
    res.json({
        msg: 'get API - controlador.',
        nombre,
        identificacion
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

const deleteUsuarios = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador.'
    })
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}