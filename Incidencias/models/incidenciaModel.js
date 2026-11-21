const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database/incidencias.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al conectar a la BD:', err.message);
});

const IncidenciaModel = {
    // Obtener todas las incidencias (para el panel del administrador)
    todas: (callback) => {
        const query = `SELECT * FROM incidencias`;
        db.all(query, [], callback);
    },

    // Registrar una nueva incidencia vinculada al usuario (HU-03)
    crear: (titulo, descripcion, categoria, ubicacion, prioridad, idUsuario, callback) => {
        const query = `INSERT INTO incidencias (titulo, descripcion, categoria, ubicacion, prioridad, id_usuario) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(query, [titulo, descripcion, categoria, ubicacion, prioridad, idUsuario], callback);
    },

    // Asignar un responsable a una incidencia (HU-04B)
    asignarResponsable: (idIncidencia, responsable, callback) => {
        const query = `UPDATE incidencias SET responsable = ? WHERE id = ?`;
        db.run(query, [responsable, idIncidencia], callback);
    },

    // Obtener incidencias filtradas por el responsable activo
    porResponsable: (responsable, callback) => {
        const query = `SELECT * FROM incidencias WHERE responsable = ?`;
        db.all(query, [responsable], callback);
    },

    // Actualizar el estado y la fecha de actualización automáticamente
    actualizarEstado: (idIncidencia, estado, callback) => {
        const query = `UPDATE incidencias SET estado = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = ?`;
        db.run(query, [estado, idIncidencia], callback);
    },
    // Obtener incidencias creadas por un usuario específico
    porUsuario: (idUsuario, callback) => {
        const query = `SELECT * FROM incidencias WHERE id_usuario = ?`;
        db.all(query, [idUsuario], callback);
    },

    // Filtrar incidencias por estado, prioridad o edificio (HU-08A)
    filtrar: (filtros, callback) => {
        let query = `SELECT * FROM incidencias WHERE 1 = 1`;
        const valores = [];

        if (filtros.estado) {
            query += ` AND estado = ?`;
            valores.push(filtros.estado);
        }
        if (filtros.prioridad) {
            query += ` AND prioridad = ?`;
            valores.push(filtros.prioridad);
        }
        if (filtros.edificio) {
            query += ` AND ubicacion LIKE ?`;
            valores.push('%' + filtros.edificio + '%');
        }

        // Solo se permiten estas formas de ordenar (HU-08B)
        const columnas = {
            fecha: 'fecha_creacion',
            estado: 'estado',
            prioridad: `CASE prioridad WHEN 'Alta' THEN 1 WHEN 'Media' THEN 2 ELSE 3 END`
        };
        const columna = columnas[filtros.orden] || 'fecha_creacion';
        const direccion = filtros.direccion === 'asc' ? 'ASC' : 'DESC';
        query += ` ORDER BY ${columna} ${direccion}`;

        db.all(query, valores, callback);
    },
};

module.exports = IncidenciaModel;