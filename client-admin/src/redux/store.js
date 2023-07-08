import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./features/menuSlice";
import studentReducer from "./features/studentSlice";
import facultyReducer from "./features/facultySlice";
import modeReducer from "./features/themeSlice"
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
  menu: menuReducer,
  student: studentReducer,
  faculty: facultyReducer,
  mode: modeReducer
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