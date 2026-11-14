-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL,
    rol TEXT NOT NULL
);

DELETE FROM usuarios;

INSERT INTO usuarios (id, nombre, correo, contrasena, rol) VALUES 
(1, 'Juan Pérez', 'alumno@unam.mx', '123456', 'ALUMNO'),
(2, 'Prof. Carlos Gómez', 'profesor@unam.mx', '123456', 'PROFESOR'),
(3, 'Admin Sistema', 'admin@unam.mx', 'admin123', 'ADMINISTRADOR'),
(4, 'Técnico Roberto', 'mantenimiento@unam.mx', '123456', 'MANTENIMIENTO');

CREATE TABLE IF NOT EXISTS incidencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    categoria TEXT NOT NULL,
    estado TEXT DEFAULT 'Pendiente',
    responsable TEXT DEFAULT 'Sin asignar',
    id_usuario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);