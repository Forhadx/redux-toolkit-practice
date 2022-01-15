import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Counter/CounterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
