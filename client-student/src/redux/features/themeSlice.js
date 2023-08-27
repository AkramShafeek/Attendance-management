import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light"
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state, action) => {
      state.mode = !(state.mode);
    }
  }
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;