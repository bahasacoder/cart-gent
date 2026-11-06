import { configureStore } from '@reduxjs/toolkit'
import { use } from 'react'
import { io } from 'next/cache' // Modul bawaan Next.js
import cartReducer from './features/cartSlice'

export const makeStore = () => {
  // Memberitahu Next.js untuk mengecualikan inisialisasi ini dari static prerender shell
  if (typeof window === 'undefined') {
    try {
      const React = require('react')
      React.use(io())
    } catch (e) {
      // Menghindari crash jika versi React di lingkungan Anda belum mendukung penuh
    }
  }

  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
