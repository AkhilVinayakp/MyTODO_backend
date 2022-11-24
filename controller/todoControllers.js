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
            error
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
     * edit the given todo  
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
            message:"Item"
        })
    }
    catch(error){

    }
}