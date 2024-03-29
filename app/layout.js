import './globals.css'

import { Inter, Outfit } from 'next/font/google'
import {AuthProvider} from './provider'
import Navbar from '@/components/nav'
const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'], weights: [400, 700], display:'swap'})
export const metadata = {
  title: 'Relationship Plus',
  description: 'Tests for your personality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
