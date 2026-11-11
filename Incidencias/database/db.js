const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'incidencias.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        
        // Ejecutar script de inicialización
        const scriptPath = path.resolve(__dirname, 'script.sql');
        if (fs.existsSync(scriptPath)) {
            const sqlScript = fs.readFileSync(scriptPath, 'utf8');
            db.exec(sqlScript, (err) => {
                if (err) {
                    console.error('Error al inicializar las tablas:', err.message);
                } else {
                    console.log('Tablas y usuarios verificados/cargados en SQLite.');
                }
            });
        }
    }
});

module.exports = db;