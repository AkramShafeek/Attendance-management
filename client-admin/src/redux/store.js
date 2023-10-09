import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import menuReducer from "./features/menuSlice";
import studentReducer from "./features/studentSlice";
import facultyReducer from "./features/facultySlice";
import modeReducer from "./features/themeSlice";
import deptReducer from "./features/deptSlice";
import classReducer from "./features/classSlice";
import courseReducer from "./features/courseSlice";
import allotmentReducer from "./features/allotmentSlice";
import timetableReduer from "./features/timetableSlice";

import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const reducers = combineReducers({
  user: userReducer,
  menu: menuReducer,
  student: studentReducer,
  faculty: facultyReducer,
  dept: deptReducer,
  class: classReducer,
  course: courseReducer,
  allotment: allotmentReducer,
  timetable: timetableReduer,
  mode: modeReducer,
});

const persistConfig = { key: "root", storage, stateReconciler: autoMergeLevel2 };
const persistedReducer = persistReducer(persistConfig, reducers);

export const persistentStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})