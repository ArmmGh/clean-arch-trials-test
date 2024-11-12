'use client'

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
}

export default function Menu(props: { items: MenuItem[] }) {
  const pathname = usePathname()
  const isActive = (url: string) => pathname === url

  return (
    <SidebarMenu>
      {props.items.map((item) => (
        <SidebarMenuItem
          key={item.title}
          className={`flex items-center text-gray-500 ${isActive(item.url) && 'text-teal-700 after:h-5 after:w-0.5 after:rounded-full after:bg-teal-700'}`}
        >
          <SidebarMenuButton asChild>
            <Link href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
