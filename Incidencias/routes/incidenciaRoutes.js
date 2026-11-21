const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const { verificarRol } = require('../middlewares/authMiddleware');

// Rutas de administración
router.get('/incidencias', verificarRol('ADMINISTRADOR'), incidenciaController.listarIncidencias);
router.post('/incidencias/asignar', verificarRol('ADMINISTRADOR'), incidenciaController.guardarAsignacion);
router.get('/incidencias/filtrar', verificarRol('ADMINISTRADOR'), incidenciaController.filtrarIncidencias);
router.put('/incidencias/reasignar', verificarRol('ADMINISTRADOR'), incidenciaController.reasignarIncidencia);

// Rutas de mantenimiento
router.get('/mis-asignaciones', verificarRol('MANTENIMIENTO'), incidenciaController.listarPorResponsable);
router.put('/incidencias/estado', verificarRol('MANTENIMIENTO'), incidenciaController.actualizarEstado);

// Rutas de Alumnos y Profesores
router.post('/incidencias', verificarRol('ALUMNO_PROFESOR'), incidenciaController.crearIncidencia);

// Rutas de Alumnos y Profesores (HU-03 y HU-07)
router.post('/incidencias', verificarRol('ALUMNO_PROFESOR'), incidenciaController.crearIncidencia);
router.get('/mis-incidencias', verificarRol('ALUMNO_PROFESOR'), incidenciaController.listarPorUsuario);

module.exports = router;