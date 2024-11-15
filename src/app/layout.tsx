import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import './globals.css'
import WrongNetworkNotifier from '@/components/layout/WrongNetworkNotifier'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '../providers'
import NextTopLoader from 'nextjs-toploader'
import AddressChangeHandler from '@/components/layout/AddressChangeHandler'
import AppNav from '@/components/layout/nav/app-nav'
import AppSidebar from './(root)/app-sidebar'
import getAddressFromSession from '@/actions/utils/get-address-from-session.util'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Media',
  description: 'Decentralized social media platform',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const headersData = await headers()
  const serverAddress = await getAddressFromSession()

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader zIndex={10000} color='hsl(var(--primary))' showSpinner={false} height={2} />

        <Providers cookies={headersData.get('cookie')}>
          <WrongNetworkNotifier />

          <AppSidebar serverAddress={serverAddress} />

          <main className='relative mx-auto flex max-w-screen-xl flex-1 flex-col overflow-hidden pl-6 pr-8'>
            <AppNav className='fixed left-[--sidebar-width] right-0 z-10 pl-6 pr-8 pt-5' />

            <div className='pb-5 pt-[116px]'>{props.children}</div>
          </main>

          <AddressChangeHandler serverAddress={serverAddress} />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
