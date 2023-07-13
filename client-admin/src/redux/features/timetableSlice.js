import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classList: [],
  selectedPeriod: null,
  isEditOpen: false,
  isPeriodEditOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
}

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    loadClass: (state, action) => {
      state.classList = action.payload;
    },
    selectPeriod: (state, action) => {
      state.selectedPeriod = action.payload;
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
    openEdit: (state, action) => {
      state.isEditOpen = true;
    },
    closeEdit: (state, action) => {
      state.isEditOpen = false;
    },
    openPeriodEdit: (state, action) => {
      state.isPeriodEditOpen = true;
    },
    closePeriodEdit: (state, action) => {
      state.isPeriodEditOpen = false;
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
  selectPeriod,
  addClass,
  removeClass,
  openEdit,
  closeEdit,
  openPeriodEdit,
  closePeriodEdit,
  openDeleteModal,
  closeDeleteModal } = timetableSlice.actions;
export default timetableSlice.reducer;