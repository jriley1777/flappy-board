import { createSlice } from "@reduxjs/toolkit";

interface AuthProps {
  user: {};
  integrations: {};
}

const initial: AuthProps = {
  user: {},
  integrations: {},
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
      };
    },
    setIntegration(state, action) {
      const integration: {} = action.payload;
      return {
        ...state,
        integrations: {
            ...state.integrations,
            ...integration
        }
      };
    },
    clearAuth() {
      return initial;
    },
  },
});

export const {
  setUser,
  setIntegration,
  clearAuth,
} = auth.actions;

export default auth.reducer;
