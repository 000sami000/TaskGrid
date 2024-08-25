import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slices/taskSlice";
export const store = configureStore({
  reducer: {
    TaskReducer,
  },
});
