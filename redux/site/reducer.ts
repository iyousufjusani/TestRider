import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../../interfaces";

const initialState: authState = {
  user: null,
  token: null,
};

const reducers = {
  setUser: (state: authState, action: any) => {
    state.user = action.payload.user;
    state.token = action.payload.tokens;
  },
  setTokens: (state: authState, action: any) => {
    state.token = action.payload;
  },
};

const auth = createSlice({
  name: "site",
  initialState,
  reducers,
});

export const siteActions = auth.actions;

export default auth.reducer;
