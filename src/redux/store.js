import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducers from "./reducers/authReducers";
import questReducers from "./reducers/questReducers";
import allUsersReducers from "./reducers/allUsersReducers";
import allAdminReducers from "./reducers/allAdminReducers";
import allCategoryReducers from "./reducers/allCategoryReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  question: questReducers,
  allUsers: allUsersReducers,
  allAdmin: allAdminReducers,
  allCategory: allCategoryReducers,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "question", "allUsers", "allAdmin", "allCategory"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);