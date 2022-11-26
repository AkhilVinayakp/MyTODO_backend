/**
 * controllers for todoes  
 */

const Todoes = require("../model/todos");
const mongoose = require("mongoose")


function TodoExceptions(status_code, message){
    this.status = status_code,
    this.message = message
}

function setLog(error){
    const resLog = {};
    if(error instanceof TodoExceptions){
        resLog.status = error.status;
        resLog.json = {
            action: "can not process the request",
            message: error.message
        }
    }
    else{
        resLog.json = {
            action:"server error",
            error: error
        };
        resLog.status = 500;
    }
    return resLog;
}

exports.todoes = async(req,res)=>{
    /**
     * Getting all todoes from the database
     */
    const uid = req.params.uid;
    try {
        const data = await Todoes.find({user_id:mongoose.Types.ObjectId(uid)});
        if(!data){
            throw new TodoExceptions(400, "user does not have any todo")
        }
        res.status(200).json({
            actions:"fetched data successfully",
            data
        })
    } catch (error) {
        const resLog = setLog(error)
        res.status(resLog.status).json(resLog.json);
    }

}

exports.createTodo = async(req, res)=>{
    /**
     * create a todo item
     * Mandatory
     *  -  title
     * Non Mandatory
     *  - task [fields inside- subTast, dueDateS], dueDate,
     * Fields set Automatically
     *  - createDate
     *  - task.createDate
     *  - task.isComplet (set as false by the database)
     */
    try{
        const dataObj = {};
        const { title, dueDate, subTasks} = req.body;
        if(!title){
            throw new TodoExceptions(400, 'title missing')
        }
        const user_id = req.params.uid;
        if(subTasks){
            subTasks.map((task)=>{
                task.createDate = Date.now();
            })
            dataObj.task = subTasks;
        }
        const newTodo = await Todoes.create({
            ...dataObj,
            title,
            dueDate,
            user_id,
            createDate: Date.now()
        })

        res.status(201).json({
            action:"processed successfully",
            todo: newTodo,
        })
        
    }catch(error){
        const resLog = setLog(error);
        res.status(resLog.status).json(resLog.json);
    }
}

exports.editTodo = async (req,res)=>{
    /**
     * edit the given todo.
     * TODO : how to edit the subtask list
     * TODO : Adding and removing from subtask
     */
    const user_id = req.params.uid
    const todo_id = req.params.tid;
    try{
        const { title, dueDate, task } = req.body;
        if(!title && !dueDate && !task){
            throw new TodoExceptions(400, "No fields to update");
        }
        const filter = {
            user_id:mongoose.Types.ObjectId(user_id), 
            _id: mongoose.Types.ObjectId(todo_id)
        };
        const dataupdate ={
            title,
            dueDate,
            task
        }
        const data = await Todoes.findOneAndUpdate(filter, dataupdate);
        if(!data){
            throw new TodoExceptions(404, "No todo found for the user");
        }
        res.status(200).json({
            message:"todo updated",
            data
        })
    }
    catch(error){
        const resLog = setLog(error);
        res.status(resLog.status).json(resLog.json);
    }
}

exports.deleteTodo = async(req, res)=>{
    const {uid, tid} = req.params;
    try {
        const filter = {
            user_id:mongoose.Types.ObjectId(uid), 
            _id: mongoose.Types.ObjectId(tid)
        };
        const out = await Todoes.findOneAndDelete(filter);
        res.status(200).json({
            message: "data deleted",
            out
        })
        
    } catch (error) {
        const resLog = setLog(error);
        res.status(500).json({ERR: error});
    }
}

exports.addSubTask = async(req,res)=>{
    /**
     * Append subTask  
     * Similar to editTodo for simplicity the editTodo
     * will restricted to edit the title and dueDate of the main task/title
     */
     const user_id = req.params.uid
     const todo_id = req.params.tid;
     const filter = {
        user_id:mongoose.Types.ObjectId(user_id), 
        _id: mongoose.Types.ObjectId(todo_id)
    };
    try {
        const { task } = req.body;
        // finding the data
        const data = await Todoes.findOne(filter);
        if(!data){
            throw new TodoExceptions(404, "TODO not found");
        }
        task.createDate =  Date.now();
        data.task.push(task);
        data.save()// saving the edited data to the database.
        res.status(200).json({
            message:"updated succesfully",
            data
        })
    } catch (error) {
        const resLog = setLog(error);
        res.status(resLog.status).json(resLog.json);
    }

}

exports.editSubTask = async (req, res)=>{
    /**
     * edit the subtask by the given id 
     */
    const {uid, tid, stid} = req.params;
    try {
        const filter = {
            user_id : mongoose.Types.ObjectId(uid),
            _id: mongoose.Types.ObjectId(tid),
            
        }
        // const data = await Todoes.findOne(filter).po;
        // console.log(data)
        // const dataMatched = data.task.filter(item => item._id == new mongoose.Types.ObjectId(stid));
        // console.log("matched data:", dataMatched);
        // console.log(data.task[0]._id);   
        const data = await Todoes.aggregate(
            {$match: {_id:mongoose.Types.ObjectId(tid), user_id:mongoose.Types.ObjectId(uid)}},
            { $unwind: '$task'},
            {$match:{"task._id":mongoose.Types.ObjectId(stid)}}
            )
        console.log(data);
        res.json(data)

    } catch (error) {
        res.status(500).json(error);
    }
}