import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";

import { travelYatriApi } from "./services";
import authSliceReducer from "./slices/auth";

 const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [travelYatriApi.reducerPath]: travelYatriApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat([travelYatriApi.middleware])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
