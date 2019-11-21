const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController")
const todoController = require("../controllers/todoController")



module.exports = function () {
    //agregar una nueva nota
    router.post("/note", noteController.addNote)
    router.post("/todo", todoController.addTodo)
    return router;
}