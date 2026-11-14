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

    // Asignar un responsable a una incidencia
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
    }
};

module.exports = IncidenciaModel;