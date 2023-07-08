import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStudent: null,
  isOpenEditModal: false,
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    selectStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    openEditModal: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeEditModal: (state, action) => {
      state.isOpenEditModal = false;
    }
  }
});

export const { selectStudent, openEditModal, closeEditModal } = studentSlice.actions;
export default studentSlice.reducer;