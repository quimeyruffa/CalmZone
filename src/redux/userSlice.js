import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_data: null
};


export default userSlice = createSlice({
  name: "user_data",
  initialState,
  reducers: {
    save: (state, action) => {
      state.user_data = action.payload;
    },
  },
});
