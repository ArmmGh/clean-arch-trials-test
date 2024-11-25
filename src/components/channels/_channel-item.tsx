'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { Channel } from '@/entities/models/channel'
import { cn } from '@/lib/utils'
import { Circle, Star } from 'lucide-react'
import Link from 'next/link'
import { Address } from 'viem'
import FollowButton from './_follow-button'
import Ping from './ping'
import { useSearchParams } from 'next/navigation'
import ChannelStatusBadge from './channel-status-badge'

export default function ChannelItem({
  isOwner,
  channel,
  className,
  userAddress,
  showStatusBadge = false,
}: {
  channel: any
  isOwner: boolean
  className?: string
  userAddress?: Address
  showStatusBadge?: boolean
}) {
  const searchParams = useSearchParams()
  const avatarFallback = channel.name.slice(0, 2)
  const isClientActive = searchParams ? searchParams.get('channel') === channel.address : false

  return (
    <Link
      className={cn(
        `relative flex cursor-pointer flex-col p-4 transition-colors duration-200 ${isClientActive ? 'bg-accent' : 'hover:bg-accent/50'} ${isOwner && 'br-2'}`,
        className,
      )}
      href={`?channel=${channel.channel_address}`}
      prefetch={true}
    >
      {channel.isFollowing && userAddress && <Ping channelAddress={channel.address} userAddress={userAddress} />}

      <div className='mb-3 flex items-center justify-between gap-1'>
        <div className='flex flex-1 items-center gap-1 overflow-hidden'>
          <Avatar>
            <AvatarImage src='/placeholder.svg' alt='Avatar' />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <h2 className='overflow-hidden text-ellipsis text-nowrap text-sm font-semibold'>{channel.name}</h2>
        </div>

        {!isOwner && userAddress && (
          <FollowButton
            className=''
            channelAddress={channel.address}
            userAddress={userAddress}
            isFollowing={channel.isFollowing}
          />
        )}
      </div>

      {/* <p className='mb-2 text-sm text-muted-foreground'>Here should be channel description</p> */}
      <div className='flex w-full items-center justify-between text-xs text-muted-foreground'>
        <div className='flex flex-1 items-center gap-1 overflow-hidden'>
          <Circle className='h-full max-h-3 w-full max-w-3' />
          <span className='mr-2 overflow-hidden text-ellipsis text-nowrap'>{channel.symbol}</span>
        </div>
        <div className='flex items-center gap-1'>
          {showStatusBadge && <ChannelStatusBadge status={channel.status} />}
          <div className='flex items-center gap-1'>
            <Star className='h-full max-h-3 w-full max-w-3' />
            {/* <span className='mr-2'>{(20).toFixed(0)}k</span> */}
            <span className=''>{channel.followersCount || 0}</span>
            {/* TODO: || 0 is business logic, move to other place */}
          </div>
        </div>

        {/* <span>Updated June 13 2024</span> */}
      </div>
    </Link>
  )
}
