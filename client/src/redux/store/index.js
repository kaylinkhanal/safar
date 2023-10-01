import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from 'redux-logger'
import userSlice from '../reducerSlices/userSlice'
import productSlice from '../reducerSlices/productSlice'
// import loginSlice from '../reducerSlices/loginSlice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
    user: userSlice,
    product:productSlice,
    // login:loginSlice
});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:[logger]
});


export const persistor = persistStore(store)
