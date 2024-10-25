import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import './globals.css'

import AddressChangeHandler from '@/components/layout/AddressChangeHandler'
import Nav from '@/components/layout/Nav'
import WrongNetworkNotifier from '@/components/layout/WrongNetworkNotifier'
import { Toaster } from '@/components/ui/toaster'
import { getConfig } from '@/lib/config/wagmi'
import { Providers } from './providers'
import NextTopLoader from 'nextjs-toploader'

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
        <NextTopLoader color='hsl(var(--primary))' showSpinner={false} height={2} />

        <Providers initialState={initialState}>
          <div className='flex h-screen flex-col'>
            <WrongNetworkNotifier />
            <Nav />

            {props.children}
          </div>

          <AddressChangeHandler />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
