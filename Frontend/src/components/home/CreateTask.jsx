import React, { useState } from "react";
import { createTask } from "../../redux/slices/taskSlice";
import { createTask_ } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import {updateloading} from "../../redux/slices/taskSlice"
import toast, { Toaster } from "react-hot-toast";
import Simpleloader from "../../Simpleloader";
function CreateTask() {
  const {loading}=useSelector((state) => state.TaskReducer)
  const dispatch = useDispatch();
  const [task, settask] = useState("");
  const createtask = async (task) => {
    try {
      dispatch(updateloading(true));
      let { data } = await createTask_({ taskName: task });

      dispatch(createTask(data.newTask));
      dispatch(updateloading(false))
      toast.success("Task created", { duration: 1000 });
    } catch (err) {
      toast(err?.response?.data.message, { duration: 1000 });
      dispatch(updateloading(false))
    }
  };
console.log(loading,"loading")
  return (
    <>
      <div className="flex flex-col gap-2 justify-center sm:flex-row items-center">
        <input
          className=" rounded-md px-2 py-1 outline-none  min-w-[25%] bg-[#e0e0e0] drop-shadow-sm"
          onChange={(e) => {
            settask(e.target.value);
          }}
          placeholder="Enter Task Name"
          type="text"
          value={task}
        />
        <button
          className="bg-[gray] px-2 py-1 rounded-md text-[white]"
          onClick={() => {
            createtask(task);
            settask("");
          }}
        >
          Create
        </button>
        {
          loading&&
        <Simpleloader/>
        }
      </div>
      <Toaster />
    </>
  );
}

export default CreateTask;
