import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classList: [],
  selectedClass: null,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const classSlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    loadClass: (state, action) => {
      state.classList = action.payload;
    },
    selectClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    addClass: (state, action) => {      
      var found = false;
      state.classList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.classList[index] = action.payload;
        }
      })
      if (!found)
        state.classList.push(action.payload);    
    },
    removeClass: (state, action) => {
      const newList = state.classList.filter((element) => element._id !== action.payload._id);
      state.classList = newList;
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
  loadClass,
  selectClass,
  addClass,
  removeClass,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal } = classSlice.actions;
export default classSlice.reducer;