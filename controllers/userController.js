const User = require("../models/user")
const Notedo = require("../models/notedo")
const { validationResult } = require("express-validator");

exports.saveUser = async(req, res, next) => {

    //verificar que no existan errores de validacion
    const errors = validationResult(req);
    const errorsArray = [];

    //si hay errores
    console.log("aaaaaaaaaaaaa");
    
    try {
        if (!errors.isEmpty()) {
            errors.array().map(error => errorsArray.push(error.msg));
            
            //enviar los errores al usuario
            res.status(400).send(errorsArray)

            console.log(req.body);
            console.log(errorsArray);
            
            
        }else{
            //crear el usuario
            const user = new User(req.body)
            await user.save();
    
            const savedUser = await User.findOne({email: req.body.email})
            console.log(savedUser);
            
            const notedo = new Notedo({userID: savedUser._id})
            console.log(notedo);
            
            notedo.save()
    
            res.status(200).send({ message: "Te has registrado correctamente."})
            console.log("hola");
            
        }
    
    } catch (error) {
        res.status(422).send({ message: "Ha ocurrido un error" })
    }
}

exports.sendUser = (req, res) => {
    res.status(200).send({user: req.user})
}