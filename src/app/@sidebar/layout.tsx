import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import SidebarNavigation from '@/components/layout/sidebar/sidebar-navigation'
import { ReactNode } from 'react'
import Logo from '@/components/logo'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import getAddressFromSession from '@/actions/utils/get-address-from-session.util'

export default async function AppSidebarLayout(props: { children: ReactNode }) {
  const promisedUserAddress = getAddressFromSession()

  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader className='px-5 py-2'>
        <Link href={'/'}>
          <Logo />
        </Link>

        <Separator />
      </SidebarHeader>

      <SidebarNavigation promisedUserAddress={promisedUserAddress} />

      {props.children}

      <SidebarFooter />
    </Sidebar>
  )
}

export const dynamic = 'force-dynamic'
