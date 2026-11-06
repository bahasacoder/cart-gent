'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import makeStore from './store'

type AppStore = typeof makeStore

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Menggunakan useRef memastikan store hanya dibuat SATU KALI di sisi klien,
  // dan mencegah Next.js mengevaluasi ulang store selama pra-render di server.
  const storeRef = useRef<AppStore>(undefined)
  
  if (!storeRef.current) {
    storeRef.current = makeStore
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
