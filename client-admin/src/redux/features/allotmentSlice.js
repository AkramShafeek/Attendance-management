import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allotmentList: [],
  selectedAllotment: null,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const ClassAllotmentSlice = createSlice({
  name: 'allotment',
  initialState,
  reducers: {
    loadAllotment: (state, action) => {
      state.allotmentList = action.payload;
    },
    selectAllotment: (state, action) => {
      state.selectedAllotment = action.payload;
    },
    addAllotment: (state, action) => {
      var found = false;
      state.allotmentList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.allotmentList[index] = action.payload;
        }
      })
      if (!found)
        state.allotmentList.push(action.payload);
    },
    removeAllotment: (state, action) => {
      const newList = state.allotmentList.filter((element) => element._id !== action.payload._id);
      state.allotmentList = newList;
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
  loadAllotment,
  selectAllotment,
  addAllotment,
  removeAllotment,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal } = ClassAllotmentSlice.actions;
export default ClassAllotmentSlice.reducer;