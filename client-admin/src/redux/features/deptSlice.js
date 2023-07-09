import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deptList: [],
  selectedDept: null,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const deptSlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    loadDept: (state, action) => {
      state.deptList = action.payload;
    },
    selectDept: (state, action) => {
      state.selectedDept = action.payload;
    },
    addDept: (state, action) => {
      const newList = state.deptList.filter((element) => element._id !== action.payload._id);
      newList.push(action.payload);
      state.deptList = newList;
    },
    removeDept: (state, action) => {
      const newList = state.deptList.filter((element) => element._id !== action.payload._id);
      state.deptList = newList;
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
  loadDept,
  selectDept,
  addDept,
  removeDept,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal } = deptSlice.actions;
export default deptSlice.reducer;