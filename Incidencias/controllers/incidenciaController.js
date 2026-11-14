const IncidenciaModel = require('../models/incidenciaModel');

const incidenciaController = {
    listarIncidencias: function(req, res) {
        IncidenciaModel.todas((err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener incidencias' });
            }
            res.json(rows);
        });
    },

    listarPorResponsable: function(req, res) {
        const responsableNombre = req.session.usuario ? req.session.usuario.nombre : null;
        if (!responsableNombre) {
            return res.status(401).json({ error: 'No autorizado o sesión expirada' });
        }
        IncidenciaModel.porResponsable(responsableNombre, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener las asignaciones' });
            }
            res.json(rows);
        });
    },

    actualizarEstado: function(req, res) {
        const { idIncidencia, estado } = req.body;
        if (!idIncidencia || !estado) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (ID o estado)' });
        }
        IncidenciaModel.actualizarEstado(idIncidencia, estado, function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar el estado de la incidencia' });
            }
            res.json({ success: true, message: 'Estado actualizado correctamente' });
        });
    },

    guardarAsignacion: function(req, res) {
        const { idIncidencia, responsable } = req.body;
        if (!idIncidencia || !responsable) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }
        IncidenciaModel.asignarResponsable(idIncidencia, responsable, function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar la asignación' });
            }
            res.json({ success: true, message: 'Responsable asignado correctamente' });
        });
    }
};

module.exports = incidenciaController;