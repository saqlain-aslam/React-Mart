import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./Slices/shopslice";
import counterReducer from "./Slices/counterSlice";
const store = configureStore({
  reducer: {
    shop: shopReducer,
    counter: counterReducer,
  },
});

export default store;
