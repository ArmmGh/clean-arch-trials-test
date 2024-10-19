import { cn } from '@/lib/utils'
import { NavigationMenuLinkProps } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { NavigationMenuLink } from './ui/navigation-menu'

export const ListItem = React.forwardRef<React.ElementRef<'a'>, Omit<NavigationMenuLinkProps, 'onSelect'>>(
  ({ className, href = '/', title, children, ...props }, ref) => {
    const pathname = usePathname()
    const isActive = href === pathname
    return (
      <li className={className}>
        <NavigationMenuLink
          asChild
          active={isActive}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          )}
        >
          <Link href={href} className='NavigationMenuLink' {...props}>
            <div className='text-sm font-medium leading-none'>{title}</div>
            {children && <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>}
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)

ListItem.displayName = 'ListItem'
