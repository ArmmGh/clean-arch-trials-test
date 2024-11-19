import getAddressFromSession from '@/actions/utils/get-address-from-session.util'
import AddressChangeHandler from '@/components/layout/AddressChangeHandler'
import AppNav from '@/components/layout/nav/app-nav'
import AppSidebar from '@/app/(root)/app-sidebar'
import React, { ReactNode } from 'react'

export default async function App(props: { children: ReactNode }) {
  const serverAddress = await getAddressFromSession()

  return (
    <React.Fragment>
      <AppSidebar serverAddress={serverAddress} />

      <main className='relative mx-auto flex max-w-screen-xl flex-1 flex-col overflow-hidden pl-6 pr-8'>
        <AppNav className='fixed left-[--sidebar-width] right-0 z-10 pl-6 pr-8 pt-5' />

        <div className='pt-[116px]'>{props.children}</div>
      </main>

      <AddressChangeHandler />
    </React.Fragment>
  )
}
