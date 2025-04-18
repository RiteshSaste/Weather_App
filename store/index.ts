import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistConfig from './persistConfig';

const persistedReducer = persistReducer(persistConfig, weatherReducer);

export const store = configureStore({
  reducer: {
    weather: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
