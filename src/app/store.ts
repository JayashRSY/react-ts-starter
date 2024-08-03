import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import counterReducer from '../features/counter/counterSlice';
import authSlice from "../features/auth/authSlice";
import layoutSlice from "../features/layout/layoutSlice";

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  layout: layoutSlice,
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor instance
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// WITHOUT PERSIST GATE

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'
// import authSlice from "../features/auth/authSlice";
// import layoutSlice from "../features/layout/layoutSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authSlice,
//     layout: layoutSlice,
//     counter: counterReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
