import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearState: (state, action) => {
      state.userInfo = state.token = null;
    }
  }
});

export const { setUserInfo, setToken, clearState } = userSlice.actions;
export default userSlice.reducer;