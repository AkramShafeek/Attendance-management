import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  selectedCourse: null,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    loadCourse: (state, action) => {
      state.courseList = action.payload;
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
    addCourse: (state, action) => {
      var found = false;
      state.courseList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.courseList[index] = action.payload;
        }
      })
      if (!found)
        state.courseList.push(action.payload);
    },
    removeCourse: (state, action) => {
      const newList = state.courseList.filter((element) => element._id !== action.payload._id);
      state.courseList = newList;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state, action) => {
      state.isEditModalOpen = false;
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
  loadCourse,
  selectCourse,
  addCourse,
  removeCourse,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal } = courseSlice.actions;
export default courseSlice.reducer;