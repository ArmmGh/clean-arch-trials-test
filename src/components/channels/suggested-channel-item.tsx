import FollowChannelButton from './follow-channel-button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Address } from 'viem'
import SmallAvatar from './shared/small-avatar'

export default function SuggestedChannelItem({
  avatarUrl,
  followersCount,
  name,
  address,
  className,
  isFollowing,
}: {
  avatarUrl: string
  followersCount: number
  name: string
  address: Address
  className?: string
  isFollowing?: boolean
}) {
  return (
    <Link href={`/channel/${address}`} className={cn('flex items-center justify-between px-2', className)}>
      <div className='flex items-center gap-2 overflow-hidden'>
        <SmallAvatar avatarUrl={avatarUrl} name={name} />

        <div className='flex-1 overflow-hidden'>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold text-black'>{name}</div>
          <div className='overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium text-slate-700'>
            {followersCount} Subscribers
          </div>
        </div>
      </div>

      {!isFollowing && <FollowChannelButton channelAddress={address} />}
    </Link>
  )
}
