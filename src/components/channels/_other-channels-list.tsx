import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './_channel-item'
import React from 'react'
import getOtherChannelsController from '@/controllers/channels/_get-other-channels.controller'
import { Address } from 'viem'

async function getOtherChannels(address?: Address) {
  try {
    return getOtherChannelsController(address)
  } catch (error) {
    return []
  }
}

export default async function OtherChannelsList() {
  const cookiesData = await cookies()
  const address = getPublisherAddressFromSession(cookiesData)
  const channels = await getOtherChannels(address)

  if (channels.length === 0) return <p className='text-center text-sm text-muted-foreground'>No Channels found</p>

  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem
          key={index}
          channel={channel}
          isOwner={address === channel.owner}
          userAddress={address}
          showStatusBadge={true}
        />
      ))}
    </React.Fragment>
  )
}
