import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payload: "This",
};

export const UserSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    login: (state, action) => {
      state.payload = action.payload;
    },
   
  },
});

export const { login } = UserSlice.actions;
export default UserSlice.reducer;
