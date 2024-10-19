'use client'

import type { Channel } from '@/entities/models/channel'
import { Circle, Star } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export default function Channel({
  isActive,
  channel,
  onChannelClick,
  className,
}: {
  isActive: boolean
  channel: Channel
  onChannelClick: () => void
  className?: string
}) {
  return (
    <div
      key={channel.symbol}
      className={cn(
        `cursor-pointer p-4 transition-colors duration-200 ${isActive ? 'bg-accent' : 'hover:bg-accent/50'}`,
        className,
      )}
      onClick={onChannelClick}
    >
      <div className='mb-2 flex items-center gap-3'>
        <Avatar className='h-8 w-8'>
          <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <h2 className='text-lg font-semibold'>{channel.name}</h2>
      </div>
      {/* <p className='mb-2 text-sm text-muted-foreground'>Here should be channel description</p> */}
      <div className='flex items-center text-xs text-muted-foreground'>
        <Circle className='mr-1 h-3 w-3 text-blue-600' />
        <span className='mr-2 max-w-[80px] overflow-hidden text-ellipsis text-nowrap'>{channel.symbol}</span>
        <Star className='mr-1 h-3 w-3' />
        <span className='mr-2'>{(20).toFixed(0)}k</span>
        <span>Updated June 13 2024</span>
      </div>
    </div>
  )
}

//     {/* <div className='flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground'>
//       <Button variant='secondary' className='px-3 shadow-none'>
//         <StarIcon className='mr-2 h-4 w-4' />
//         Star
//       </Button>
//       <Separator orientation='vertical' className='h-[20px]' />
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant='secondary' className='px-2 shadow-none'>
//             <ChevronDownIcon className='h-4 w-4 text-secondary-foreground' />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
//           <DropdownMenuItem>
//             <UserPlus className='mr-2 h-4 w-4' /> Follow Publisher
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Meh className='mr-2 h-4 w-4' /> Not interested
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <TriangleAlert className='mr-2 h-4 w-4' /> Report
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Ban className='mr-2 h-4 w-4' />
//             Ban
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
