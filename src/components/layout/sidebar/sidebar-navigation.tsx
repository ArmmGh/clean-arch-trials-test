'use client'

import { SidebarGroup, SidebarGroupContent, SidebarMenu } from '@/components/ui/sidebar'
import { Bookmark, Home, Rocket, Settings, TrendingUp } from 'lucide-react'
import MenuItem from './menu-item'
import { usePathname } from 'next/navigation'
import { useAppKitAccount } from '@reown/appkit/react'
import { Separator } from '@/components/ui/separator'

const publicItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Towers',
    url: '/towers',
    icon: Rocket,
    isProtected: true,
  },
  {
    title: 'Trending News',
    url: '/trending-news',
    icon: TrendingUp,
  },
]

const userItems = [
  {
    title: 'Saved',
    url: '/saved',
    icon: Bookmark,
    isProtected: true,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
    isProtected: true,
  },
]

export default function SidebarNavigation({ isConnected }: { isConnected: boolean }) {
  const pathname = usePathname()

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {publicItems.map((item, index) => (
              <MenuItem
                key={index}
                protect={item.isProtected && !isConnected ? true : false}
                icon={item.icon}
                title={item.title}
                isConnected={isConnected}
                isActive={pathname === item.url}
                url={item.url}
                isProtected={item.isProtected}
              />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>

        <Separator className='mt-[6px]' />
      </SidebarGroup>

      {isConnected && (
        <SidebarGroup className='pt-0'>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item, index) => (
                <MenuItem
                  key={index}
                  protect={item.isProtected && !isConnected ? true : false}
                  icon={item.icon}
                  title={item.title}
                  isConnected={isConnected}
                  isActive={pathname === item.url}
                  url={item.url}
                  isProtected={item.isProtected}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <Separator className='mt-[6px]' />
        </SidebarGroup>
      )}
    </>
  )
}
