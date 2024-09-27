import React from "react";
import { useSelector } from "react-redux";
import Singletask from "./Singletask";
import { useDrop, useDrag } from "react-dnd";
import { updateTask_ } from "../../api";
import { updateloading, updateTask } from "../../redux/slices/taskSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
function TaskBoard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.TaskReducer);

  const handleDrop = async (task, status) => {
    try {
      dispatch(updateloading(true));
      if (task.tstatus !== status) {
        const { data } = await updateTask_(task.id, { taskStatus: status });
        
        dispatch(updateTask(data.updatedTask));
        dispatch(updateloading(false));
        toast("Task Status updated", { icon: "👏", duration: 1000 });
      }
    } catch (err) {
      dispatch(updateloading(false));
      toast(err?.response?.data.message, { duration: 1000 });
    }
  };

  const [{ isOver: isOverToDo }, dropToDo] = useDrop(() => ({
    accept: "task",
    drop: (item) => handleDrop(item, "TODO"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverInProgress }, dropInProgress] = useDrop(() => ({
    accept: "task",
    drop: (item) => handleDrop(item, "IN PROGRESS"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isOver: isOverClosed }, dropClosed] = useDrop(() => ({
    accept: "task",
    drop: (item) => handleDrop(item, "CLOSED"),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="mx-[10%] my-[5%]">
      <div className="flex gap-5 justify-between">
        <div
          ref={dropToDo}
          className={`w-[100%] ${
            isOverToDo ? "bg-[#6f6f6f25]" : ""
          } transition-colors duration-200 pb-2 rounded-md`}
        >
          <div className="bg-[#525252] mb-5 rounded-md w-[100%] py-[10px] text-center flex justify-center gap-4 text-[white]">
            TODO
            <span className="bg-[white] px-[7px] py-[0px] rounded-[100%] text-[black]">
              {tasks.filter((task) => task.taskStatus === "TODO").length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks
              .filter((task) => task.taskStatus === "TODO")
              .map((task) => (
                <div key={task._id}>
                  <Singletask task={task} />
                </div>
              ))}
          </div>
        </div>

        <div
          ref={dropInProgress}
          className={`w-[100%] ${
            isOverInProgress ? "bg-[#6f6f6f25]" : ""
          } transition-colors duration-200 pb-2 rounded-md`}
        >
          <div className="bg-[#ee6ed9] mb-5  rounded-md w-[100%] py-[10px] text-center flex justify-center gap-4 text-[white]">
            IN PROGRESS
            <span className="bg-[white] px-[7px] py-[0px] rounded-[100%] text-[black]">
              {tasks.filter((task) => task.taskStatus === "IN PROGRESS").length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks
              .filter((task) => task.taskStatus === "IN PROGRESS")
              .map((task) => (
                <div key={task._id}>
                  <Singletask task={task} />
                </div>
              ))}
          </div>
        </div>

        <div
          ref={dropClosed}
          className={`w-[100%] ${
            isOverClosed ? "bg-[#6f6f6f25]" : ""
          } transition-colors duration-200 pb-2 rounded-md`}
        >
          <div className="bg-[#0fd56c] mb-5  rounded-md w-[100%] py-[10px] text-center flex justify-center gap-4 text-[white]">
            CLOSED
            <span className="bg-[white] px-[7px] py-[0px] rounded-[100%] text-[black]">
              {tasks.filter((task) => task.taskStatus === "CLOSED").length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks
              .filter((task) => task.taskStatus === "CLOSED")
              .map((task) => (
                <div key={task._id}>
                  <Singletask task={task} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default TaskBoard;
