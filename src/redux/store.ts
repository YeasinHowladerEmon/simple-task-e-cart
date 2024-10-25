import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { api } from "./api/apiSlice";
import cartReducer from './features/Cart/cartSlice';
const persistConfig = {
  key: 'cart',
  storage,
}

const persistedCartReducer = persistReducer(persistConfig, cartReducer)


const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(api.middleware)
});
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;

