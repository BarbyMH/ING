const db = require('../database/db');

class UsuarioModel {
    static buscarPorCredenciales(correo, contrasena, callback) {
        const query = `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`;
        db.get(query, [correo, contrasena], (err, row) => {
            callback(err, row);
        });
    }

    // Nuevo método para registrar usuarios desde un formulario
    static crear(nombre, correo, contrasena, rol, callback) {
        const query = `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)`;
        db.run(query, [nombre, correo, contrasena, rol], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = UsuarioModel;