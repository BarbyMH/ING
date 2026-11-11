function verificarRol(rolPermitido) {
    return (req, res, next) => {
        if (!req.session || !req.session.usuario) {
            return res.redirect('/login.html?error=no_session');
        }

        const usuarioRol = req.session.usuario.rol;

        if (usuarioRol === rolPermitido) {
            return next();
        }

        if (rolPermitido === 'ALUMNO_PROFESOR' && (usuarioRol === 'ALUMNO' || usuarioRol === 'PROFESOR')) {
            return next();
        }

        return res.redirect('/login.html?unauthorized=true');
    };
}

module.exports = { verificarRol };
