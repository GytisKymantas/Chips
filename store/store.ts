import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter'
// Import your reducers here

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;