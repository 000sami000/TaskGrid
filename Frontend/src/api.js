import axios from "axios";
const API=axios.create({baseURL:"http://localhost:3000"})
export  const signIn_=(formdata)=>{
  return API.post('/user/signin',formdata, {withCredentials:true})
}
export  const signUp_=(formdata)=>{
    console.log(formdata)
  return    API.post('/user/signup',formdata)
}
export  const signOut_=()=>{
    
  return    API.post('/user/signout',{},{withCredentials:true})
}
export const  createTask_=(taskobj)=>{
    console.log(taskobj);
    return API.post('/task/createtask',taskobj,{withCredentials:true});
}
export const  getTask_=()=>{
    // console.log(taskobj);
    return API.get('/task/gettasks',{withCredentials:true});
}
export const  updateTask_=(id,update_obj)=>{
    // console.log(taskobj);
    return API.patch(`/task/updatetasks/${id}`,update_obj,{withCredentials:true});
}
export const  deleteTask_=(id)=>{
    // console.log(taskobj);
    return API.delete(`/task/deletetask/${id}`,{withCredentials:true});
}
