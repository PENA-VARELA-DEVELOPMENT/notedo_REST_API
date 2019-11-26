const Notedo = require("../models/notedo");

// Agrega una nueva nota
exports.addNote = async (req, res, next) => {
    const note = new Notedo(req.body);

    try {
        await note.save();
        note.updateOne({
            userID: req.user._id
        },
        {
            $push:{savings:{
                "name": req.body.saveName,
                "goal": Number(req.body.goal),
                "amount": 0
            }}
        },function(err, cb) {
            
        }
        )
    
        res.status(201).send({ message: "nota agregada correctamente" });
    } catch (error) {
        res.status(422).send({ error: "ha ocurrido un error al momento de guardar la nota" })
    }
};

// Obtiene una nota por su id
exports.getOneNote = async (req, res, next) => {
    try {
        const note = await Notedo.findById(req.params.idNote);

        if (!note) {
            res.status(404).send({ error: "la nota no existe" });
        } else {
            res.status(200).send(note);
        }
    } catch (error) {
        res.status(422).send({ error: "Ha ocurrido un error al momento de obtener la nota" });
    }
}


// Obtiene todas las notas
exports.getAllNotes = async (req, res, next) => {
    try {
        const note = await Notedo.find({});

        if (!note) {
            res.status(404).send({ error: "Error al obtener las notas." });
        } else {
            res.status(200).send(note);
        }
    } catch (error) {
        res.status(422).send({ error: "Ha ocurrido un error al momento de obtener las notas" });
    }
}


// Actualiza una nota por su id
exports.updateNote = async (req, res, next) => {
    try {
        const note = await Notedo.findOneAndUpdate(
            { _id: req.params.idNote },
            req.body,
            { new: true }
        );

        res.status(200).send(note);
    } catch (error) {
        res
            .status(422)
            .send({ error: "Ha ocurrido un error al momento de actualizar" });
    }
};


// Eliminar una nota por su id
exports.deleteNote = async (req, res, next) => {
    try {
        await Notedo.findByIdAndDelete({ _id: req.params.idNote });

        res.status(200).send({ mensaje: "Nota eliminada satisfactoriamente" });
    } catch (error) {
        res
            .status(422)
            .send({ error: "Ha ocurrido un error al eliminar" });
    }
};
