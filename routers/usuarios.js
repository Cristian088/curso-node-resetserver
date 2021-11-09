const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { esRolValido, emailExist, idUserExist } = require('../helpers/db-validators');
const { validarCampos } = require('../middleware/validar-campos');

const router = Router();

router.get( '/', getUsuarios );

router.post( '/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','la contraseña tiene que tener mas 6 letras').isLength( { min: 6} ),
    check('email','El correo no es valido').isEmail(),
    check('email').custom( emailExist ),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
],postUsuarios );

router.put( '/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idUserExist ),
    check('rol').custom( esRolValido ),
    validarCampos   
], putUsuarios );

router.delete( '/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( idUserExist ),
    validarCampos
],deleteUsuarios );




module.exports = router;