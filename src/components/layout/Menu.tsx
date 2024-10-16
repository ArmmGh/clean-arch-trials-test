'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { ListItem } from '../ListItem'

export default function Menu() {
  const { isConnected } = useAccount()

  if (!isConnected) return null

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/dashboard' legacyBehavior passHref>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuTrigger>
          </Link>

          <NavigationMenuContent className=''>
            <ul className='bg-red flex w-[300px] flex-col'>
              <ListItem className='w-full' title='Create Article' href='/dashboard/create-article'>
                Mint NFT of your Article
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
