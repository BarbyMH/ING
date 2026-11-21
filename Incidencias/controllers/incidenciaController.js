const IncidenciaModel = require('../models/incidenciaModel');

const incidenciaController = {
    // Listar todas las incidencias (Panel Administrador)
    listarIncidencias: function(req, res) {
        IncidenciaModel.todas((err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener incidencias' });
            }
            res.json(rows);
        });
    },

    // Crear nueva incidencia
    crearIncidencia: function(req, res) {
        const { descripcion, tipo, prioridad, aula, edificio } = req.body;
        const idUsuario = req.session.usuario ? req.session.usuario.id : null;

        if (!idUsuario) {
            return res.status(401).json({ error: 'No autorizado o sesión expirada' });
        }

        // Los formularios envian tipo, y el del profesor envia aula y edificio
        const categoria = req.body.categoria || tipo;
        let ubicacion = req.body.ubicacion;
        if (!ubicacion && edificio && aula) {
            ubicacion = edificio + ', aula ' + aula;
        }

        if (!descripcion || !categoria || !ubicacion || !prioridad) {
            return res.status(400).json({ error: 'Faltan datos obligatorios (descripción, tipo, ubicación o prioridad)' });
        }

        const titulo = req.body.titulo || (categoria + ' - ' + ubicacion);

        IncidenciaModel.crear(titulo, descripcion, categoria, ubicacion, prioridad, idUsuario, function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar la incidencia en la base de datos' });
            }
            res.status(201).json({ 
                success: true, 
                message: 'Incidencia creada correctamente', 
                id: this.lastID 
            });
        });
    },

    // Listar incidencias creadas por el alumno/profesor activo
    listarPorUsuario: function(req, res) {
        const idUsuario = req.session.usuario ? req.session.usuario.id : null;

        if (!idUsuario) {
            return res.status(401).json({ error: 'No autorizado o sesión expirada' });
        }

        IncidenciaModel.porUsuario(idUsuario, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el historial de incidencias' });
            }
            res.json(rows);
        });
    },

    // Listar incidencias asignadas al técnico de mantenimiento activo
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

    // Actualizar el estado de la incidencia con fecha automática
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

    // Guardar asignación de responsable
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
    },

    // Filtrar y ordenar incidencias (Panel Administrador)
    filtrarIncidencias: function(req, res) {
        const filtros = {
            estado: req.query.estado,
            prioridad: req.query.prioridad,
            edificio: req.query.edificio,
            orden: req.query.orden,
            direccion: req.query.direccion
        };

        IncidenciaModel.filtrar(filtros, (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al filtrar las incidencias' });
            }
            res.json(rows);
        });
    },

    // Reasignar una incidencia a otro responsable
    reasignarIncidencia: function(req, res) {
        const { idIncidencia, nuevoResponsable } = req.body;

        if (!idIncidencia || !nuevoResponsable) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }

        IncidenciaModel.buscarPorId(idIncidencia, (err, incidencia) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar la incidencia' });
            }
            if (!incidencia) {
                return res.status(404).json({ error: 'La incidencia no existe' });
            }
            if (incidencia.responsable === 'Sin asignar') {
                return res.status(400).json({ error: 'La incidencia aún no tiene responsable, usa la asignación normal' });
            }
            if (incidencia.responsable === nuevoResponsable) {
                return res.status(400).json({ error: 'El nuevo responsable es el mismo que el actual' });
            }

            IncidenciaModel.reasignarResponsable(idIncidencia, nuevoResponsable, function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Error al reasignar la incidencia' });
                }
                res.json({
                    success: true,
                    message: 'Incidencia reasignada de ' + incidencia.responsable + ' a ' + nuevoResponsable
                });
            });
        });
    }
};

module.exports = incidenciaController;