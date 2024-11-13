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
            <ul className='grid w-[320px] gap-1 p-3'>
              <ListItem className='w-full' title='Create Channel' href='/dashboard/create-channel'>
                Create NFT Collection for your Articles
              </ListItem>
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
