const express =require('express');
const router=express.Router();
const {createtask, gettasks,updateTask,deletetask}=require("../controller/taskController")
const {isAuthorize}=require("../middleware/auth")
router.post('/createtask',isAuthorize,createtask);
router.delete('/deletetask/:id',isAuthorize ,deletetask);
router.get('/gettasks',isAuthorize ,gettasks);
router.patch('/updatetasks/:id',isAuthorize ,updateTask);

module.exports=router;