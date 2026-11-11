const db = require('../database/db');

class UsuarioModel {
    static buscarPorCredenciales(correo, contrasena, callback) {
        const query = `SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?`;
        
        // Imprimir en consola para depurar qué está buscando
        console.log(`Intentando buscar usuario con correo: [${correo}] y contraseña: [${contrasena}]`);

        db.get(query, [correo, contrasena], (err, row) => {
            if (err) {
                console.error('Error en la consulta SQL de login:', err.message);
            } else {
                console.log('Resultado de la búsqueda en BD:', row ? '¡Usuario encontrado!' : 'Usuario NO encontrado o credenciales incorrectas');
            }
            callback(err, row);
        });
    }

    static crear(nombre, correo, contrasena, rol, callback) {
        const query = `INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)`;
        db.run(query, [nombre, correo, contrasena, rol], function(err) {
            callback(err, this ? this.lastID : null);
        });
    }
}

module.exports = UsuarioModel;