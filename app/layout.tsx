// /app/app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from '@/lib/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shopping Cart - Redux Toolkit',
  description: 'Modern shopping cart built with Next.js and Redux Toolkit',
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
