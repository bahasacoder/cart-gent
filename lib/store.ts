import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
// ... import your reducers
import productReducer from "@/lib/features/productSlice"
import cartReducer from "@/lib/features/cartSlice"

const persistConfig = {
  key: "cart",
  storage: storage,
};

const rootReducers = combineReducers({
  cart: cartReducer,
  product: productReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
   reducer:  persistedReducer , 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  
export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
