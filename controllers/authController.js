const passport = require("passport");

exports.authenticateUser = passport.authenticate('local', (err, user, info) => {
    if (err) {
        res.status(500).send({message : "Ha ocurrido un error"})
    } else if(!user) {
        res.status(400).send({message: "Nombre de usuario o contraseña invalidos."})
    }
    req.logIn(user, (err) => {
        if (err) {
            res.status(500).send({message : "Ha ocurrido un error"})
        } else {
            res.status(200).send({message : "Bienvenido"})
        }
    })
    
});


exports.logOut = function (req, res) {
    req.logout();
    res.status(200).send({ message: "Cerraste sesión"})
}

exports.checkUser = (req, res, next) => {
    // Retorna true si el usuario ya realizó la autenticación
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({ message: "No autorizado."})
    }
};