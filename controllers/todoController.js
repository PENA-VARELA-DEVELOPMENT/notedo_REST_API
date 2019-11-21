const Todo = require("../models/todo");

exports.addTodo = async (req, res, next) => {
    const todo = new Todo(req.body);

    try {
        await todo.save();
        res.status(201).send({ message: "todo agregada correctamente" });
    } catch (error) {
        res.status(422).send({error: "ha ocurrido un error al momento de guardar el todo"})
     }
};
