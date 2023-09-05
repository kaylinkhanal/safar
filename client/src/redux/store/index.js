import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from 'redux-logger'
import userSlice from '../reducerSlices/userSlice'

const reducer = combineReducers({
    user: userSlice
});

const store = configureStore({
  reducer,
  middleware:[logger]
});

export default store;
