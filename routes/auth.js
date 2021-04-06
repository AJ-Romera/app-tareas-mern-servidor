// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Iniciar sesión
// api/auth
router.post(
    '/',
    [
        check('email', 'Por favor, introduzca un email válido').isEmail(),
        check(
            'password',
            'El password debe ser de al menos 6 caracteres'
        ).isLength({ min: 6 }),
    ],
    authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get('/', auth, authController.usuarioAutenticado);

module.exports = router;
