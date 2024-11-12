'use client'

import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { Bookmark, Home, Settings, Siren, TrendingUp } from 'lucide-react'
import Menu from './sidebar-menu'

export default function SidebarNavigation() {
  const publicItems = [
    {
      title: 'Home',
      url: '/',
      icon: Home,
    },
    {
      title: 'Breaking News',
      url: '/breaking-news',
      icon: Siren,
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
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ]

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <Menu items={publicItems} />
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupContent>
          <Menu items={userItems} />
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
