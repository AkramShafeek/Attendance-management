import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStudent: null
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    selectStudent: (state, action) => {
      state.selectedStudent = action.payload;
    }
  }
});

export const { selectStudent } = studentSlice.actions;
export default studentSlice.reducer;