import ChannelItem from './_channel-item'
import React from 'react'
import { Channel } from '@/entities/models/channel'
import { Address } from 'viem'

export default function AbstractChannelsList({
  channels,
  address,
  className,
}: {
  address?: Address
  channels: Channel[]
  className?: string
}) {
  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem
          className={className}
          key={index}
          channel={channel}
          isOwner={address === channel.owner}
          userAddress={address}
        />
      ))}
    </React.Fragment>
  )
}
