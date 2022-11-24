/**
 * contains all the routes related to the 
 * 
 */

const express = require("express");
const routes = express.Router();
const auth = require("../middleware/userAuth")
const { todoes, createTodo } = require("../controller/todoControllers")
// get all the controller for todos

// getAlltodos
routes.get("/todoes/:uid", auth, todoes);
routes.post("/todoes/:uid/create", auth, createTodo);

module.exports = routes;