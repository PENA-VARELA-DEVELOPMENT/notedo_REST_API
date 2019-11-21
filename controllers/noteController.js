const Note = require("../models/notes");

exports.addNote = async (req, res, next) => {
    const note = new Note(req.body);

    try {
        await note.save();
        res.status(201).send({ message: "nota agregada correctamente" });
    } catch (error) {
        res.status(422).send({error: "ha ocurrido un error al momento de guardar la nota"})
     }
};
