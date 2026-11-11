const UsuarioModel = require('../models/UsuarioModel');

exports.login = (req, res) => {
    const { correo, contrasena } = req.body;

    UsuarioModel.buscarPorCredenciales(correo, contrasena, (err, usuario) => {
        if (err || !usuario) {
            return res.redirect('/login.html?error=true');
        }

        req.session.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        switch (usuario.rol) {
            case 'ADMINISTRADOR':
                res.redirect('/dashboard-admin.html');
                break;
            case 'MANTENIMIENTO':
                res.redirect('/dashboard-mantenimiento.html');
                break;
            case 'ALUMNO':
            case 'PROFESOR':
                res.redirect('/dashboard-alumno.html');
                break;
            default:
                res.redirect('/login.html');
                break;
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login.html');
    });
};

// Nuevo controlador para manejar el registro de nuevos usuarios
exports.registrar = (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    UsuarioModel.crear(nombre, correo, contrasena, rol, (err) => {
        if (err) {
            console.error('Error al registrar usuario:', err.message);
            return res.redirect('/registro.html?error=true');
        }
        // Redirigir al login una vez registrado con éxito
        res.redirect('/login.html?registrado=true');
    });
};