import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  facultyList: [],
  selectedFaculty: null,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    loadFaculty: (state, action) => {
      state.facultyList = action.payload;
    },
    selectFaculty: (state, action) => {
      state.selectedFaculty = action.payload;
    },
    addFaculty: (state, action) => {      
      var found = false;
      state.facultyList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.facultyList[index] = action.payload;
        }
      })
      if (!found)
        state.facultyList.push(action.payload);    
    },
    removeFaculty: (state, action) => {
      const newList = state.facultyList.filter((element) => element._id !== action.payload._id);
      state.facultyList = newList;
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
  loadFaculty,
  selectFaculty,
  addFaculty,
  removeFaculty,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal } = facultySlice.actions;
export default facultySlice.reducer;