'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store' // Mengimpor makeStore, bukan store global

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // 1. Membuat referensi store yang diisolasi
  const storeRef = useRef<AppStore>(undefined)
  
  // 2. Store hanya akan dibuat SATU KALI di sisi klien (browser) saat pertama kali dimuat
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  // 3. Masukkan instance store yang stabil ke dalam Provider Redux
  return <Provider store={storeRef.current}>{children}</Provider>
}
