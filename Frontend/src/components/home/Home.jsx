import React, { useEffect } from "react";
import CreateTask from "./CreateTask";
import TaskBoard from "./TaskBoard";
import { useDispatch } from "react-redux";
import { getTask_ } from "../../api";
import { getTasks } from "../../redux/slices/taskSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {updateloading} from "../../redux/slices/taskSlice"
function Home() {
  const dispatch = useDispatch();
  async function gettasks() {
    try {
      dispatch(updateloading(true));
      const { data } = await getTask_();
      console.log(data)
      dispatch(updateloading(false));
      dispatch(getTasks(data.Tasks));
    } catch (err) {
      dispatch(updateloading(false));
      console.log("gettasks ---err", err);
    }
  }
  useEffect(() => {
    gettasks();
  }, []);
  return (
    <>
      <div className=" min-h-screen ">
        <br />
        <br />
        <br />
        <br />
        <CreateTask />
        <DndProvider backend={HTML5Backend}>
          <TaskBoard />
        </DndProvider>
      </div>
    </>
  );
}

export default Home;
