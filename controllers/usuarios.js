const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {
    const {nombre, identificacion} = req.query;
    res.json({
        msg: 'get API - controlador.',
        nombre,
        identificacion
    })
}

const postUsuarios = (req = request, res = response) => {
    const {nombre , edad, id} = req.body;
    
    res.json({
        msg: 'put API - controlador.',
        id,
        nombre,
        edad
    });
}

const putUsuarios = (req, res = response) => {
    const { id } = req.query;
    res.json({
        msg: 'put API - controlador.',
        id
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