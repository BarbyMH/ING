const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Middlewares para procesar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesiones
app.use(session({
    secret: 'clave_secreta_incidencias_unam',
    resave: false,
    saveUninitialized: false
}));

// Carpeta estática para las vistas (HTML, CSS, JS frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Enrutar peticiones de autenticación bajo /api
app.use('/api', authRoutes);

// Iniciar servidor local
app.listen(PORT, () => {
    console.log(`Servidor corriendo localmente en http://localhost:${PORT}`);
});