/**
 * Schema for   TODOs
 */
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Main title required"],
        Minleangth:[5, "Minimum title length : 5"],
        unique: true
    },
    task: [{
        subTask: {
            type: String,
            minLength:[5, "Minimum subtitle length is 5"]
        },
        dueDateS: Date,
        createDate: Date,
        isComplete:{
            type:Boolean,
            default: false,
        }
    }],

    createDate: Date,

    dueDate: {
        type: Date,
        // TODO Validation. due date of the the main task should be >= subtask due date
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "userID requried"]
    }

});
module.exports = mongoose.model("todo", todoSchema);