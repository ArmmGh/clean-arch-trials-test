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
  channels: any[] //Channel[]
  className?: string
}) {
  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem className={className} key={index} channel={channel} isOwner={true} userAddress={address} />
      ))}
    </React.Fragment>
  )
}
