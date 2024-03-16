import './globals.css'

import { Inter, Outfit } from 'next/font/google'
import {AuthProvider} from './provider'
import Navbar from '@/components/nav'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Relationship Plus',
  description: 'Tests for your personality',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-TestCalibre">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
