const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea una tarea
// api/tareas
router.post(
    '/',
    auth,
    [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    [
        check('proyecto', 'El proyecto del proyecto es obligatorio')
            .not()
            .isEmpty(),
    ],
    tareaController.crearTarea
);

// Obtener las tareas de un proyecto
router.get('/', auth, tareaController.obtenerTareas);

module.exports = router;
