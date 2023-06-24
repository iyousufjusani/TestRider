import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../../interfaces";

const initialState: authState = {
  user: null,
  token: null,
};

const reducers = {
  setUser: (state: authState, action: any) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  logout: (state: authState) => {
    state.user = null;
    state.token = null;
  },
  updateUser: (state: authState, action: any) => {
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const actions = auth.actions;

export default auth.reducer;
