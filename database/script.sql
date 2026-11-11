CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL,
    rol TEXT CHECK(rol IN ('ALUMNO', 'PROFESOR', 'ADMINISTRADOR', 'MANTENIMIENTO')) NOT NULL
);

-- Usuarios de prueba iniciales
INSERT OR IGNORE INTO usuarios (id, nombre, correo, contrasena, rol) VALUES
(1, 'Alexander Guzmán', 'alexanderguzman322@aragon.unam.mx', '322117589', 'ALUMNO'),
(2, 'Prof. Aaron Velasco Agustin', 'aaronvelasco93@aragon.unam.mx', '322117599', 'PROFESOR'),
(3, 'Admin Sistema', 'admin@aragon.unam.mx', 'admin123', 'ADMINISTRADOR'),
(4, 'Técnico HuronMarron', 'mantenimiento@aragon.unam.mx', '123456', 'MANTENIMIENTO');