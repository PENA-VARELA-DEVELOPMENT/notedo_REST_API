const User = require("../models/user")

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    if (!errors.isEmpty()) {
        errors.array().map(error => errorsArray.push(error.msg));
        
        //enviar los errores al usuario
        req.flash("error", errorsArray);
        
        
        res.render("register",{
            messages: req.flash(),
            alt: JSON.stringify(errorsArray)
        });
    }else{
        //crear el usuario

        const user = new User(req.body)

        await user.save();
        req.flash("Hecho", ["Te has registrado correctamente."])
        res.redirect("/login")
    }
}