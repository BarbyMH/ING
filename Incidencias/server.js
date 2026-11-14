const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const { verificarRol } = require('./middlewares/authMiddleware');

const incidenciaRoutes = require('./routes/incidenciaRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sesiones
app.use(session({
    secret: 'clave_secreta_incidencias_unam',
    resave: false,
    saveUninitialized: false
}));

// Rutas de Autenticación
app.use('/api', authRoutes);
app.use('/api', incidenciaRoutes);

// --- RUTAS PROTEGIDAS POR ROL ---
app.get('/dashboard-admin.html', verificarRol('ADMINISTRADOR'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard-admin.html'));
});

app.get('/dashboard-mantenimiento.html', verificarRol('MANTENIMIENTO'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard-mantenimiento.html'));
});

app.get('/dashboard-alumno.html', verificarRol('ALUMNO_PROFESOR'), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard-alumno.html'));
});

// Vistas estáticas públicas (login, registro, css, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo localmente en http://localhost:3000`);
});