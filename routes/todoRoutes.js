/**
 * contains all the routes related to the 
 * 
 */

const express = require("express");
const routes = express.Router();
const auth = require("../middleware/userAuth")
const { todoes, createTodo, editTodo, deleteTodo,
    addSubTask
} = require("../controller/todoControllers")
// get all the controller for todos

// getAlltodos
routes.get("/todoes/:uid", auth, todoes);
routes.post("/todoes/:uid/create", auth, createTodo);
routes.put("/todoes/:uid/edit/:tid", auth, editTodo);
routes.delete("/todoes/:uid/delete/:tid", auth, deleteTodo );
// add additional task to already existing todo
routes.put("/todoes/:uid/todo/:tid/add", auth, addSubTask );
// edit the given subtask;
// routes.put("/todoes/:uid/todo/:tid/task/:stid", auth, addSubTask );

module.exports = routes;