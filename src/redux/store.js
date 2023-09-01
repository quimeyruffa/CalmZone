import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    userData: userSlice.reducer,
  },
});
