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
    crear: (titulo, descripcion, categoria, idUsuario, callback) => {
        const query = `INSERT INTO incidencias (titulo, descripcion, categoria, id_usuario) VALUES (?, ?, ?, ?)`;
        db.run(query, [titulo, descripcion, categoria, idUsuario], callback);
    },

    // Asignar un responsable a una incidencia (HU-04B)
    asignarResponsable: (idIncidencia, responsable, callback) => {
        const query = `UPDATE incidencias SET responsable = ? WHERE id = ?`;
        db.run(query, [responsable, idIncidencia], callback);
    },

    // Obtener incidencias filtradas por el responsable activo (HU-05)
    porResponsable: (responsable, callback) => {
        const query = `SELECT * FROM incidencias WHERE responsable = ?`;
        db.all(query, [responsable], callback);
    },

    // Actualizar el estado y la fecha de actualización automáticamente (HU-06A y HU-06B)
    actualizarEstado: (idIncidencia, estado, callback) => {
        const query = `UPDATE incidencias SET estado = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = ?`;
        db.run(query, [estado, idIncidencia], callback);
    }
};

module.exports = IncidenciaModel;