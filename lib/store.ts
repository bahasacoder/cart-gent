// /app/lib/store.js

'use client'

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  })
}

export const store = makeStore()
