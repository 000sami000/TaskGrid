import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  tasks: [],
  loading:false
};
export const taskSlice = createSlice({
  name: "task_",
  initialState,
  reducers: {
    createTask: (state, action) => {
      console.log("create_Task action", action);

      state.tasks.unshift(action.payload);
    },
    getTasks: (state, action) => {
      console.log("get_Task action", action);
      return { ...state, tasks: action.payload };
    },
    deleteTasks: (state, action) => {
      console.log("delete_Task action", action);
      return {
        ...state,
        tasks: state.tasks.filter((itm) => itm._id !== action.payload._id),
      };
    },
    updateTask: (state, action) => {
      console.log("updateTask action", action);
      return {
        ...state,
        tasks: state.tasks.map((itm) =>
          itm._id === action.payload._id ? action.payload : itm
        ),
      };
    },
    updateloading:(state,action)=>{
      console.log(action.payload,">>><><")
      return {
        ...state,loading:action.payload
      }
    }
  },
});

export const { createTask, getTasks, deleteTasks, updateTask,updateloading } =
  taskSlice.actions;
export default taskSlice.reducer;
