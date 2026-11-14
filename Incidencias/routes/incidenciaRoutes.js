const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const { verificarRol } = require('../middlewares/authMiddleware');

// Obtener lista de incidencias
router.get('/incidencias', verificarRol('ADMINISTRADOR'), incidenciaController.listarIncidencias);

// Guardar asignación de responsable
router.post('/incidencias/asignar', verificarRol('ADMINISTRADOR'), incidenciaController.guardarAsignacion);

//Ruta para asignaciones-personal de Mantenimiento
router.get('/mis-asignaciones', verificarRol('MANTENIMIENTO'), incidenciaController.listarPorResponsable);
//Ruta para cambiar de estado
router.put('/incidencias/estado', verificarRol('MANTENIMIENTO'), incidenciaController.actualizarEstado);
module.exports = router;