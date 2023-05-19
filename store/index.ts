import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import betSlipSlice from "./slices/betSlipSlice";
import mactchesSlice from "./Matches";
import userSlipSlice from "./slices/userSlipSlice";
import categorySlice from "./Category";
import UISlice from "./slices/uiSlice";
import tokenSlice from "./slices/tokenSlice";
import bettingRulesSlice from "./slices/bettingRulesSlice";
import countriesSlice from "./slices/countries";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "bettingRules"],
  // blacklist: [],
};

const rootReducer = combineReducers({
  betSlip: betSlipSlice,
  matches: mactchesSlice,
  user: userSlipSlice,
  categorySlice: categorySlice,
  ui: UISlice,
  token: tokenSlice,
  bettingRules: bettingRulesSlice,
  countries: countriesSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // bật middleware thunk
      immutableCheck: false, // tắt kiểm tra bất biến
      serializableCheck: false, // tắt kiểm tra đối tượng có thể tuần tự hóa
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
