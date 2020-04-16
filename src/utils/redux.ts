import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "../reducers/index";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;