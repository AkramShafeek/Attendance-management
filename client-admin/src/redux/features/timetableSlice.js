import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timetableList: [],
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
    loadTimetable: (state, action) => {
      state.timetableList = action.payload;
    },
    selectPeriod: (state, action) => {
      state.selectedPeriod = action.payload;
    },
    addTimetable: (state, action) => {
      var found = false;
      state.timetableList.forEach((element, index) => {
        if (element._id === action.payload._id) {
          found = true;
          state.timetableList[index] = action.payload;
        }
      })
      if (!found)
        state.timetableList.push(action.payload);
    },
    removeClass: (state, action) => {
      const newList = state.timetableList.filter((element) => element._id !== action.payload._id);
      state.timetableList = newList;
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
  loadTimetable,
  selectPeriod,
  addTimetable,
  removeClass,
  openEdit,
  closeEdit,
  openPeriodEdit,
  closePeriodEdit,
  openDeleteModal,
  closeDeleteModal } = timetableSlice.actions;
export default timetableSlice.reducer;