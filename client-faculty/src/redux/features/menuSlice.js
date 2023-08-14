import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMenu: "Today's Attendance"
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    selectMenu: (state, action) => {
      state.selectedMenu = action.payload
    }
  }
});

export const { selectMenu } = menuSlice.actions;
export default menuSlice.reducer;