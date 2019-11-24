const Todo = require("../models/todo");

// Agregar tarea(todo)
exports.addTodo = async (req, res, next) => {
    const todo = new Todo(req.body);

    try {
        await todo.save();
        res.status(201).send({ message: "Tarea agregada correctamente" });
    } catch (error) {
        res.status(422).send({error: "ha ocurrido un error al momento de guardar la tarea"})
     }
};


// Obtiene una tarea(todo) por su id
exports.getOneTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.idTodo);

        if (!todo) {
            res.status(404).send({ error: "la tarea no existe" });
        } else {
            res.status(200).send(todo);
        }
    } catch (error) {
        res.status(422).send({ error: "Ha ocurrido un error al momento de obtener la tarea" });
    }
}


// Obtiene todas las tareas(todo)
exports.getAllTodos = async (req, res, next) => {
    try {
        const todo = await Todo.find({});

        if (!todo) {
            res.status(404).send({ error: "Error al obtener las tareas." });
        } else {
            res.status(200).send(todo);
        }
    } catch (error) {
        res.status(422).send({ error: "Ha ocurrido un error al momento de obtener las tareas" });
    }
}


// Actualiza una tarea(todo) por su id
exports.updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.idTodo },
            req.body,
            { new: true }
        );

        res.status(200).send(todo);
    } catch (error) {
        res
            .status(422)
            .send({ error: "Ha ocurrido un error al momento de actualizar" });
    }
};


// Eliminar una tarea(todo) por su id
exports.deleteTodo = async (req, res, next) => {
    try {
        await Todo.findByIdAndDelete({ _id: req.params.idTodo });

        res.status(200).send({ mensaje: "Tarea eliminada satisfactoriamente" });
    } catch (error) {
        res
            .status(422)
            .send({ error: "Ha ocurrido un error al eliminar" });
    }
};

