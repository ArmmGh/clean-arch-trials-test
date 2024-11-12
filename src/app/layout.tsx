import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import { type ReactNode } from 'react'
import './globals.css'
import AddressChangeHandler from '@/components/layout/AddressChangeHandler'
import AppNav from '@/components/layout/nav/app-nav'
import WrongNetworkNotifier from '@/components/layout/WrongNetworkNotifier'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '../providers'
import NextTopLoader from 'nextjs-toploader'
import AppSidebar from '@/components/layout/sidebar/app-sidebar'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Decentralized social media platform',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const headersData = await headers()
  const cookiesData = await cookies()
  const serverAddress = getPublisherAddressFromSession(cookiesData)

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader zIndex={10000} color='hsl(var(--primary))' showSpinner={false} height={2} />

        <Providers cookies={headersData.get('cookie')}>
          <WrongNetworkNotifier />

          <AppSidebar serverAddress={serverAddress} />

          <main className='mx-auto max-w-screen-xl flex-1 py-5 pr-8'>
            <AppNav />

            {props.children}
          </main>

          <AddressChangeHandler serverAddress={serverAddress} />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
