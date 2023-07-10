import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentList: [],
  selectedStudent: null,
  isOpenEditModal: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    loadStudents: (state, action) => {
      state.studentList = action.payload;
    },
    selectStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
    addStudent: (state, action) => {
      var found = false;
      state.studentList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.studentList[index] = action.payload;
        }
      })
      if (!found)
        state.studentList.push(action.payload);
    },
    removeStudent: (state, action) => {
      const newList = state.studentList.filter((element) => element._id !== action.payload._id);
      state.studentList = newList;
    },
    openEditModal: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeEditModal: (state, action) => {
      state.isOpenEditModal = false;
    },
    openDeleteModal: (state, action) => {
      state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state, action) => {
      state.isDeleteModalOpen = false;
    }
  }
});

export const { 
  loadStudents,
  selectStudent,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  addStudent,
  removeStudent } = studentSlice.actions;
export default studentSlice.reducer;