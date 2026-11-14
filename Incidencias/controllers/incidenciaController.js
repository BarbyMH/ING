const IncidenciaModel = require('../models/incidenciaModel');

const incidenciaController = {
    listarIncidencias: (req, res) => {
        IncidenciaModel.todas((err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener incidencias' });
            }
            res.json(rows);
        });
    },

    guardarAsignacion: (req, res) => {
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