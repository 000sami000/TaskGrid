const taskModel=require("../model/taskModel");
const errorHandler=require('../utils/error')
const createtask=async (req,res,next)=>{
     console.log("////",req.body)
    //  console.log(">>",req.cookies)
    req.body.creatorId=req.USER_ID;
    try{
         const newTask=new taskModel(req.body);
            await newTask.save();
            res.status(200).json({newTask})
        }catch(err){
            return  next(errorHandler(400,err._message))
        }
        
}

const gettasks=async (req,res,next)=>{
   
    // console.log(">>",req.cookies)
    try{
        const Tasks= await taskModel.find({creatorId:req.USER_ID});
        res.status(200).json({Tasks})
           
   }catch(err){
       return  next(errorHandler(400,err._message))
   }

}

const updateTask=async (req,res,next)=>{
    console.log("////",req.body)
    console.log(req.params);
    const {id}=req.params
   //  console.log(">>",req.cookies)
   try{
        const updatedTask=await taskModel.findByIdAndUpdate(id,req.body,{new:true});
       
           res.status(200).json({updatedTask})
       }catch(err){
           return  next(errorHandler(400,err._message))
       }
       
}
const deletetask=async (req,res,next)=>{
    const {id}=req.params;
   try{

        const deletedTask=await taskModel.findByIdAndDelete(id);
           res.status(200).json({deletedTask})
   }catch(err){
       return  next(errorHandler(400,err._message))
   }

}
module.exports={createtask,gettasks,updateTask,deletetask}