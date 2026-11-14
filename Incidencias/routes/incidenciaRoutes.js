const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const { verificarRol } = require('../middlewares/authMiddleware');

// Rutas de administración
router.get('/incidencias', verificarRol('ADMINISTRADOR'), incidenciaController.listarIncidencias);
router.post('/incidencias/asignar', verificarRol('ADMINISTRADOR'), incidenciaController.guardarAsignacion);

// Rutas de mantenimiento
router.get('/mis-asignaciones', verificarRol('MANTENIMIENTO'), incidenciaController.listarPorResponsable);
router.put('/incidencias/estado', verificarRol('MANTENIMIENTO'), incidenciaController.actualizarEstado);

// Rutas de Alumnos y Profesores
router.post('/incidencias', verificarRol('ALUMNO_PROFESOR'), incidenciaController.crearIncidencia);

module.exports = router;