const User = require("../models/user")

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    if (!errors.isEmpty()) {
        errors.array().map(error => errorsArray.push(error.msg));
        
        //enviar los errores al usuario
        res.status(400).send(errorsArray)
    }else{
        //crear el usuario
        const user = new User(req.body)
        await user.save();
        res.status(200).send({ message: "Te has registrado correctamente."})
    }
}