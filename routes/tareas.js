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
    tareaController.crearTarea
);

/* // Obtener todos los proyectos del usuario
router.get('/', auth, proyectoController.obtenerProyectos);

// Actualizar proyecto via ID
router.put(
    '/:id',
    auth,
    [check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()],
    proyectoController.actualizarProyecto
);

// Eliminar un proyecto via ID
router.delete('/:id', auth, proyectoController.eliminarProyecto);

*/

module.exports = router;
