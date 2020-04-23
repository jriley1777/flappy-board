import { createSlice } from "@reduxjs/toolkit";

interface AuthProps {
  user: {
    uid?: string,
    name?: string,
    email?: string,
    photoURL?: string
  };
  integrations: {};
  isLoggedIn: boolean;
  isFetching: boolean;
}

const initial: AuthProps = {
  user: {},
  integrations: {},
  isLoggedIn: false,
  isFetching: false,
};

const auth = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    setUser(state, action) {
      const user: {} = action.payload;
      return {
        ...state,
        user,
        isLoggedIn: true,
      };
    },
    clearUser(state){
      return {
        ...state,
        user: {},
        isLoggedIn: false
      }
    },
    setUserFetching(state, action) {
      const isFetching: boolean = action.payload;
      return {
        ...state,
        isFetching,
      };
    },
    setIntegration(state, action) {
      const integration: {} = action.payload;
      return {
        ...state,
        integrations: {
          ...state.integrations,
          ...integration,
        },
      };
    },
    clearAuth() {
      return initial;
    },
  },
});

export const {
  setUser,
  setUserFetching,
  setIntegration,
  clearAuth,
  clearUser,
} = auth.actions;

export default auth.reducer;
