/**
 * Schema for   TODOs
 */
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Main title required"],
        Minleangth:[5, "Minimum title length : 5"],
    },
    task: new mongoose.Schema({
        subTask:{
            type: String,
            minLength:[5, "Minimum subtitle length is 5"]
        },
        dueDate: Date,
        createDate: Date,
        isComplete:{
            type:Boolean,
            default: false,
        }
    }),

    createDate: Date,

    dueDate: {
        type: Date,
        // TODO Validation. due date of the the main task should be >= subtask due date
    }

});
module.exports = mongoose.model("todo", todoSchema);