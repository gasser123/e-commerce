import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoSchema, UserInfo } from "../../schemas/UserInfo.schema";

export interface AuthState {
  userInfo: UserInfo | null;
}

const storedUserInfo = localStorage.getItem("userInfo");
const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
const validateUserInfo = UserInfoSchema.safeParse(userInfo).success;
const initialState: AuthState = {
  userInfo: validateUserInfo ? userInfo : null,
};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const tokenExpiration = Date.now() + 4 * 24 * 60 * 60 * 1000;
      localStorage.setItem("tokenExpiration", tokenExpiration.toString());
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("tokenExpiration");
    },
  },
});

export default authSlice;
