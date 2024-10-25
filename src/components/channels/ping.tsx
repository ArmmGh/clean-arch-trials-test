'use client'

import { useChannelNotifications } from '@/hooks/useChannelNotifications'
import { Address } from 'viem'

export default function Ping({ userAddress, channelAddress }: { userAddress: Address; channelAddress: Address }) {
  const hasNotification = useChannelNotifications(channelAddress, userAddress)

  // Don't show anything while loading to prevent flash
  if (!hasNotification) return null

  // Check if this channel has unread notifications

  return (
    <div className='absolute left-2 top-2'>
      <span className='relative flex h-2.5 w-2.5'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75'></span>
        <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500'></span>
      </span>
    </div>
  )
}
