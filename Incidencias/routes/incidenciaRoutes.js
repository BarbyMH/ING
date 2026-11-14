const express = require('express');
const router = express.Router();
const incidenciaController = require('../controllers/incidenciaController');
const { verificarRol } = require('../middlewares/authMiddleware');

// Obtener lista de incidencias
router.get('/incidencias', verificarRol('ADMINISTRADOR'), incidenciaController.listarIncidencias);

// Guardar asignación de responsable
router.post('/incidencias/asignar', verificarRol('ADMINISTRADOR'), incidenciaController.guardarAsignacion);

module.exports = router;