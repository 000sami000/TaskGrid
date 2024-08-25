import React, { useState } from 'react'
import {createTask} from "../../redux/slices/taskSlice"
import { createTask_ } from '../../api';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
function CreateTask() {
     const currentUser=JSON.parse(localStorage.getItem('currentUser'));
     console.log("???",currentUser)
  const dispatch=useDispatch();
  const [task,settask]=useState("")
  
  const createtask=async(task)=>{
    try{

      let {data}=await createTask_({taskName:task});
      console.log("=====",data)

      dispatch(createTask(data.newTask))
    
      toast.success("Task created",{duration: 1000})
    }catch(err){
      // setisloading(false)
      console.log("create task error----",err?.response?.data.message);
      // seterror(err.response.data.message)
      toast(err?.response?.data.message,{duration:1000})
    }
   }

  return (
    <>
    <div className='flex flex-col gap-2 justify-center sm:flex-row items-center'>
    <input className=' rounded-md px-2 py-1 outline-none  min-w-[25%] bg-[#e0e0e0] drop-shadow-sm' onChange={(e)=>{settask(e.target.value)}} placeholder='Enter Task Name' type='text' value={task}/><button className='bg-[gray] px-2 py-1 rounded-md text-[white]' onClick={()=>{createtask(task);  settask("")}}>Create</button>
    </div>
    <Toaster />
    </>
  )
}

export default CreateTask