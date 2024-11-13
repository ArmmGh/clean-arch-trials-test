import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import './globals.css'
import WrongNetworkNotifier from '@/components/layout/WrongNetworkNotifier'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '../providers'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Decentralized social media platform',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const headersData = await headers()

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader zIndex={10000} color='hsl(var(--primary))' showSpinner={false} height={2} />

        <Providers cookies={headersData.get('cookie')}>
          <WrongNetworkNotifier />

          {props.children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
