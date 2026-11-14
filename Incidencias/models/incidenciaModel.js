const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../database/incidencias.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al conectar a la BD:', err.message);
});

const IncidenciaModel = {
    // Obtener todas las incidencias (para admin)
    todas: (callback) => {
        const query = `SELECT * FROM incidencias`;
        db.all(query, [], callback);
    },
    // Asignar responsable
    asignarResponsable: (idIncidencia, responsable, callback) => {
        const query = `UPDATE incidencias SET responsable = ? WHERE id = ?`;
        db.run(query, [responsable, idIncidencia], callback);
    },
    //Obtener incidencias asignadas a un responsable especifico
    porResponsable: (responsable, callback) => {
        const query = `SELECT * FROM incidencias WHERE responsable = ?`;
        db.all(query, [responsable], callback);
    }

};

module.exports = IncidenciaModel;