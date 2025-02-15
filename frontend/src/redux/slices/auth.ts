import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { travelYatriApi } from "../services";
import { IUser } from "../../contracts/IUser";

export const AUTH_KEY = "auth";

const persistedAuth =
  sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);

export interface AuthSlice {
  authenticated: IUser | null;
}

const initialState: AuthSlice = {
  authenticated: persistedAuth ? JSON.parse(persistedAuth) : null,
};

export const authSlice = createSlice({
  name: AUTH_KEY,
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = null;
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      travelYatriApi.endpoints.loginWithGoogle.matchFulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.authenticated = payload.data;
          sessionStorage.setItem(AUTH_KEY, JSON.stringify(payload.data));
          localStorage.setItem(AUTH_KEY, JSON.stringify(payload.data));
        } else {
          sessionStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(AUTH_KEY);
        }
      }
    );
    builder.addMatcher(
      travelYatriApi.endpoints.adminLogin.matchFulfilled,
      (state, { payload }) => {
        if (payload.data) {
          state.authenticated = payload.data;
          sessionStorage.setItem(AUTH_KEY, JSON.stringify(payload.data));
          localStorage.setItem(AUTH_KEY, JSON.stringify(payload.data));
        } else {
          sessionStorage.removeItem(AUTH_KEY);
          localStorage.removeItem(AUTH_KEY);
        }
      }
    );
  },
});

export default authSlice.reducer;
export const selectAuthUser = (state: RootState) => state.auth.authenticated;

export const { logout } = authSlice.actions;
