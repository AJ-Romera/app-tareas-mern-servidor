const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { json } = require('express');

exports.autenticarUsuario = async (req, res) => {
    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    // Extraer el email y el password
    const { email, password } = req.body;

    try {
        // Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // Revisar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        // Si todo es correcto:
        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id,
            },
        };

        // Firmar el JWT
        jwt.sign(
            payload,
            process.env.SECRETO,
            {
                expiresIn: 3600, // 3600s = 60 minutos = 1 Hora
            },
            (error, token) => {
                if (error) throw error;

                // Mensaje de confirmación
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

// Obtiene qué usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({ usuario });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' });
    }
};
