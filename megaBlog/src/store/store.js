import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add other reducers here for postSlice
  },
});

export default store;