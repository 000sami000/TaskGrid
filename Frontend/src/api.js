import axios from "axios";
const API=axios.create({baseURL:process.env.BACKEND_URL})
export  const signIn_=(formdata)=>{
  return API.post('/user/signin',formdata, {withCredentials:true})
}
export  const signUp_=(formdata)=>{
  return    API.post('/user/signup',formdata)
}
export  const signOut_=()=>{
    
  return    API.post('/user/signout',{},{withCredentials:true})
}
export const  createTask_=(taskobj)=>{

    return API.post('/task/createtask',taskobj,{withCredentials:true});
}
export const  getTask_=()=>{
   
    return API.get('/task/gettasks',{withCredentials:true});
}
export const  updateTask_=(id,update_obj)=>{
  
    return API.patch(`/task/updatetasks/${id}`,update_obj,{withCredentials:true});
}
export const  deleteTask_=(id)=>{

    return API.delete(`/task/deletetask/${id}`,{withCredentials:true});
}
