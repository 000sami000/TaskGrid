import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import moment from "moment";
import { useDrag } from "react-dnd";
import { deleteTask_ } from "../../api";
import { deleteTasks } from "../../redux/slices/taskSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {updateloading} from "../../redux/slices/taskSlice"
function Singletask({ task }) {
  const { taskName, _id, taskStatus, createdAt } = task;
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: _id, tstatus: taskStatus },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deletetask = async () => {
    try {
      dispatch(updateloading(true));
      const { data } = await deleteTask_(_id);
      
      dispatch(deleteTasks(data.deletedTask));
      dispatch(updateloading(false));
      toast("Deleted Successfully", { icon: "💀", duration: 1000 });
    } catch (err) {
      dispatch(updateloading(false));
      toast(err.response.data.message, { icon: "👏", duration: 1000 });
      console.log("delete err----", err.response.data.message);
    }
  };

  return (
    <>
      <div
        ref={drag}
        onMouseEnter={() => {
          setshow(true);
        }}
        onMouseLeave={() => {
          setshow(false);
        }}
        className={`bg-[#f9f7f7]  rounded-md px-2 py-2  border-2   cursor-pointer ${
          isDragging ? "opacity-[50%]" : "opacity-[100%] "
        }`}
      >
        <div key={_id} className="  flex items-center justify-between">
          <div className="text-[20px] break-words whitespace-break-spaces">
            {taskName}{" "}
          </div>
          <IoIosCloseCircleOutline
            className="text-[20px]"
            onClick={() => {
              deletetask();
            }}
          />
        </div>
        <div>
          {show && (
            <div
              className={`opacity-100 text-[14px] italic ${
                taskStatus === "TODO"
                  ? "text-[black]"
                  : taskStatus === "IN PROGRESS"
                  ? "text-[#ee6ed9]"
                  : "text-[#0fd56c]"
              }`}
            >
              {moment(createdAt).format("MMMM Do, YYYY, h:mm A")}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Singletask;
