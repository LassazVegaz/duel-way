import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userName: null as string | null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    logout(state) {
      state.userName = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
