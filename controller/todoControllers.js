/**
 * controllers for todoes  
 */

const Todoes = require("../model/todos");

function TodoExceptions(status_code, message){
    this.status = status_code,
    this.message = message
}

exports.todoes = async(req,res)=>{
    /**
     * Getting all todoes from the database
     */

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
        const { title, dueDate, subTasks, dueDateS} = req.body;
        if(!title){
            throw new TodoExceptions(400, 'title missing')
        }
        const user_id = req.params.uid;
        if(subTasks){
            subTasks.map((task)=>{
                task.createDate = Date.now();
                task.dueDateS = dueDateS
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
        if(error instanceof TodoExceptions){
            res.status(error.status).json({
                action: "can not process the request",
                message: error.message
            })
        }
        else{
            res.status(500).json({
                action:"server error",
                error
            });
        }
    }
}