import { createSlice, type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";
import moment from "moment";

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  token: string,
}

type AuthState = {
  isAuthenticated: boolean
  user: User
  loginTime: string
}

export const authSlice = createSlice<AuthState, SliceCaseReducers<AuthState>, string>({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      token: "",
    },
    loginTime: "",
  },
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.loginTime = moment.now().toString();
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        token: "",
      };
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
