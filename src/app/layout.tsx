import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import './globals.css'

import Nav from '@/components/layout/Nav'
import { Toaster } from '@/components/ui/toaster'
import { getConfig } from '@/lib/config/wagmi'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sociam Media',
  description: 'Decentralized social media platform',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(getConfig(), headers().get('cookie'))

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers initialState={initialState}>
          {/* bg-gray-900 */}
          <div className='flex h-screen flex-col'>
            <Nav />

            {props.children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
