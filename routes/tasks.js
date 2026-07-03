const express = require('express');
const {tasks} = require('../data/tasks.json');
const router = express.Router();

/**
 * Route: /tasks
 * Method: GET
 * Description: Get all the tasks in the system
 * Access: Public
 * Parameters: None
 */
router.get("/",(req,res) => {
    res.status(200).json({
        success: true,
        data: tasks
    })
})

/**
 * Route: /tasks/:id
 * Method: GET
 * Description: Get a single task in the system by their id
 * Access: Public
 * Parameters: Id
 */
router.get("/:id",(req,res) => {
    const {id} = req.params;
    const task = tasks.find((task) => task.id === id);
    if(!task) {
        return res.status(404).json({
            success: false,
            message: `Task is not found with id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: task
    })
})

/**
 * Route: /tasks
 * Method: POST
 * Description: Create/Register a task in the system
 * Access: Public
 * Parameters: None
 */
router.post("/", (req,res)=>{
    const {id,title,description,priority,status,dueDate} = req.body;
    const task = tasks.find((task)=> task.id === id);
    
    if(!id || !title || !description || !priority || !status || !dueDate){
        res.status(400).json({
            success: false,
            message: "Please fill all the required fields"
        })
    }
    
    if(task){
        return res.status(409).json({
            success: false,
            message: `Task is already exists with id:${id}`
        })
    }
    
    tasks.push({
        id,
        title,
        description,
        priority,
        status,
        dueDate
    })
    
    res.status(201).json({
        success: true,
        message: `Task is created successfully with id:${id}`
    })
})

/**
 * Route: /tasks/:id
 * Method: PUT
 * Description: Update a task in the system by their id
 * Access: Public
 * Parameters: Id
 */
router.put("/:id", (req,res)=>{
    const {id} = req.params;
    const task = tasks.find((task)=> task.id === id);
    
    if(!task){
        return res.status(404).json({
            success: false,
            message: `Task is not found with id:${id}`
        })
    }
    
    const {data} = req.body;
    const updatedTask = tasks.map((each)=>{
        return{
            ...each,
            ...data
        }
    })
    
    res.status(200).json({
        success: true,
        data: updatedTask[updatedTask.findIndex((each)=> each.id === id)],
        message: `Task is updated successfully with id:${id}`
    })
})

/**
 * Route: /tasks/:id
 * Method: DELETE
 * Description: Delete a task in the system by their id
 * Access: Public
 * Parameters: Id
 */
router.delete("/:id", (req,res)=>{
    const {id} = req.params;
    const task = tasks.find((task)=> task.id === id);
    if(!task){
        return res.status(404).json({
            success: false,
            message: `Task is not found with id:${id}`
        })
    }
    
    const updateTask = tasks.filter((task)=> task.id !== id);
    
    res.status(200).json({
        success: true,
        data: updateTask,
        message: `Task is deleted successfully with id:${id}`
    })
})

module.exports = router;