// /app/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { useEffect, useState } from "react";


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
  },

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;

    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }

    },
    updateQuantity(state, action) {
      const { id, type } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      
      if (existingItem) {
        if (type === 'increment') {
          existingItem.quantity++;
          existingItem.totalPrice += existingItem.price;
          state.totalQuantity++;
          state.totalAmount += existingItem.price;
        } else if (type === 'decrement' && existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalQuantity--;
          state.totalAmount -= existingItem.price;
        }
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;