// 'use client'

// import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
// import Link from 'next/link'
// import { Lock, LucideIcon } from 'lucide-react'
// import { usePathname, useRouter } from 'next/navigation'
// import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
// import { cn } from '@/lib/utils'
// import MenuItem from './menu-item'

// export default function Menu(props: { items: MenuItem[] }) {
//   const pathname = usePathname()
//   const { open } = useAppKit()
//   const { isConnected } = useAppKitAccount()

//   const isActive = (url: string) => pathname === url

//   const handleProtectedRoute = (e: React.MouseEvent) => {
//     if (isConnected) return

//     e.stopPropagation()
//     e.preventDefault()

//     open({
//       view: 'Connect',
//     })
//   }

//   return (
//     <SidebarMenu>
//       {props.items.map((item, index) => (
//         <MenuItem
//           key={index}
//           isConnected={isConnected}
//           isActive={pathname === item.url}
//           url={item.url}
//           isProtected={item.isProtected}
//         />
//         // <SidebarMenuItem key={item.title} className={cn('flex items-center text-gray-500')}>
//         //   <SidebarMenuButton
//         //     className={cn(
//         //       isActive(item.url) && 'text-teal-700 after:h-5 after:w-0.5 after:rounded-full after:bg-teal-700',
//         //     )}
//         //     asChild
//         //     // disabled={item.isProtected && !isConnected
//         //   >
//         //     <Link
//         //       onClick={(e) => item.isProtected && handleProtectedRoute(e)}
//         //       href={item.isProtected && !isConnected ? pathname : item.url}
//         //       className='flex flex-1 justify-between'
//         //     >
//         //       <div className='flex items-center gap-2'>
//         //         <item.icon size={16} strokeWidth={2} />
//         //         <span>{item.title}</span>
//         //       </div>

//         //       {item.isProtected && isConnected && <Lock className='text-red-700' size={16} />}
//         //     </Link>
//         //   </SidebarMenuButton>
//         // </SidebarMenuItem>
//       ))}
//     </SidebarMenu>
//   )
// }
