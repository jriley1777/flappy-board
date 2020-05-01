import { createSlice } from "@reduxjs/toolkit";

interface AppProps {
  initialLoad: boolean;
}

const initial: AppProps = {
  initialLoad: true,
};

const app = createSlice({
  name: "app",
  initialState: initial,
  reducers: {
    completeInitialLoad(state) {
      return {
        ...state,
        initialLoad: false,
      };
    },
  },
});

export const { completeInitialLoad } = app.actions;

export default app.reducer;
