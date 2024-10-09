'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { useAccount } from 'wagmi'

export default function Menu() {
  const { isConnected } = useAccount()

  console.log('isConnected: ', isConnected)

  if (!isConnected) return null

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href='/dashboard' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
          </Link>

          {/* <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger> */}
          {/* <NavigationMenuContent>
            <NavigationMenuLink>Create Post</NavigationMenuLink>
          </NavigationMenuContent> */}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
