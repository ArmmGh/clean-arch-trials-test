import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { Lock, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
  isProtected?: boolean
}

export default function MenuItem(props: {
  url: MenuItem['url']
  isProtected?: MenuItem['isProtected']
  isActive: boolean
  isConnected: boolean
  icon: MenuItem['icon']
  title: MenuItem['title']
  protect: boolean
}) {
  const handleProtectedRoute = () => {}

  return (
    <SidebarMenuItem className="text-gray-500' flex items-center">
      <SidebarMenuButton
        className={cn(props.isActive && 'text-teal-700 after:h-5 after:w-0.5 after:rounded-full after:bg-teal-700')}
        asChild
      >
        <Link
          onClick={(e) => props.isProtected && handleProtectedRoute()}
          href={props.url}
          className='flex flex-1 justify-between'
        >
          <div className='flex items-center gap-2'>
            <props.icon size={16} strokeWidth={2} />
            <span>{props.title}</span>
          </div>

          {props.protect && <Lock className='text-red-700' size={16} />}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
