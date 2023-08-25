import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

const initialState = {
  token: null
};


export default tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    save: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      SecureStore.deleteItemAsync("apple-credentials");
    },
  },
});
