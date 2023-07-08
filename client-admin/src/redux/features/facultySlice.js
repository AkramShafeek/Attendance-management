import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFaculty: null,
  isOpenEditModal: false,
}

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    selectFaculty: (state, action) => {
      state.selectedFaculty = action.payload;
    },
    openEditModal: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeEditModal: (state, action) => {
      state.isOpenEditModal = false;
    }
  }
});

export const { selectFaculty, openEditModal, closeEditModal } = facultySlice.actions;
export default facultySlice.reducer;