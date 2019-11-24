const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController")
const todoController = require("../controllers/todoController")



module.exports = function () {
    // Operaciones de las notas 
    router.post("/note", noteController.addNote);               // C
    router.get("/note/:idNote", noteController.getOneNote);     // R
    router.get("/note", noteController.getAllNotes);            // R
    router.put("/note/:idNote", noteController.updateNote);     // U
    router.delete("/note/:idNote", noteController.deleteNote);  // D


    // Operaciones de las tareas
    router.post("/todo", todoController.addTodo);               // C
    router.get("/todo/:idTodo", todoController.getOneTodo);     // R
    router.get("/todo", todoController.getAllTodos);            // R
    router.put("/todo/:idTodo", todoController.updateTodo);     // U
    router.delete("/todo/:idTodo", todoController.deleteTodo);  // D

    return router;
}