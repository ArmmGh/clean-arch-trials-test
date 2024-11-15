import { Channel } from '@/entities/models/channel'
import FollowChannelButton from './follow-channel-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useReadFollowChannelsIsFollowing } from '@/generated'
import { useAppKitAccount } from '@reown/appkit/react'
import { Address } from 'viem'

export default function ChannelItem({
  name,
  symbol,
  address,
  withFollowButton = false,
  className,
  userAddress,
}: {
  withFollowButton?: boolean
  name: Channel['name']
  symbol: Channel['symbol']
  address: Channel['address']
  className?: string
  userAddress?: Address
}) {
  // const { data: isFollowing } = useReadFollowChannelsIsFollowing({
  //   args: [userAddress!, address],
  //   query: { enabled: !!(withFollowButton && userAddress) },
  // })

  // TODO: maybe shorten address with first and last chars for url
  return (
    <Link
      href={`/channel/${address}`}
      prefetch={true}
      className={cn('flex items-center justify-between px-2 py-1', className)}
    >
      <div className='flex items-center gap-2 overflow-hidden'>
        <Avatar className='relative h-10 w-10'>
          <AvatarImage src='/placeholder.svg' alt={name} />

          <AvatarFallback>
            {name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 overflow-hidden'>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black'>{name}</div>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-slate-600'>{symbol}</div>
        </div>
      </div>

      {withFollowButton && <FollowChannelButton channelAddress={address} />}
    </Link>
  )
}
