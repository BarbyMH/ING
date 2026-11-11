// Middleware para verificar si el usuario ha iniciado sesión y tiene el rol permitido
function verificarRol(rolPermitido) {
    return (req, res, next) => {
        if (!req.session || !req.session.usuario) {
            return res.redirect('/login.html?error=no_session');
        }

        const usuarioRol = req.session.usuario.rol;

        // Si el rol coincide directamente
        if (usuarioRol === rolPermitido) {
            return next();
        }

        // Si agrupamos Alumno y Profesor
        if (rolPermitido === 'ALUMNO_PROFESOR' && (usuarioRol === 'ALUMNO' || usuarioRol === 'PROFESOR')) {
            return next();
        }

        // Si no tiene permisos
        return res.redirect('/login.html?unauthorized=true');
    };
}

module.exports = { verificarRol };