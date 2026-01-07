import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from "@/store/slices/paymentSlice"
import userReducer from "@/store/slices/userSlice"
// Import your slice reducers here

const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer, // Register user slice
  },
});

export default store;
