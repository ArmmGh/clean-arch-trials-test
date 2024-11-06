import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './channel-item'
import React from 'react'
import getAllChannelsController from '@/controllers/channels/get-all-channels.controller'
import { Address } from 'viem'

async function getAllChannels(address?: Address) {
  try {
    return getAllChannelsController(address)
  } catch (error) {
    return []
  }
}

export default async function AllChannelsList() {
  const cookiesData = await cookies()
  const address = getPublisherAddressFromSession(cookiesData)
  const channels = await getAllChannels(address)

  if (channels.length === 0) return <p className='text-center text-sm text-muted-foreground'>No Channels found</p>

  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem key={index} channel={channel} isOwner={address === channel.owner} userAddress={address} />
      ))}
    </React.Fragment>
  )
}
