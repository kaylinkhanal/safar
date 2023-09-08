import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  token: '',
  id: '',
  userDetails: {},
  isLoggedIn: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginDetails: (state, actions) => {
      const {token, isLoggedIn, userInfo} =actions.payload
     return {
       ...state,
       token,
       isLoggedIn,
       userDetails:userInfo
     }
    },
    logout: (state) => {
      return {
        ...initialState
      }
    },
  }
});

export const { setLoginDetails, logout } = userSlice.actions;
export default userSlice.reducer;
