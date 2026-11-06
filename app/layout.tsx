import { Inter } from 'next/font/google'
import { Suspense } from 'react' // 1. Import Suspense
import StoreProvider from '@/lib/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopping Cart - Redux Toolkit',
  description: 'Modern shopping cart built with Next.js and Redux Toolkit',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Bungkus StoreProvider dengan Suspense boundary */}
        <Suspense fallback={<div className="loading-shell">Loading Application...</div>}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </Suspense>
      </body>
    </html>
  )
}
