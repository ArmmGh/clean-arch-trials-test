import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from '../wagmi'
import { Providers } from './providers'
import Nav from '@/components/layout/Nav'

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
          <Nav />

          {props.children}
        </Providers>
      </body>
    </html>
  )
}
