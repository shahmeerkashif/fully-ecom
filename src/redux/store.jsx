import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // 👈 this imports the reducer only

export const store = configureStore({
  reducer: {
    cart: cartReducer, // ✅ use reducer function here
  },
});
