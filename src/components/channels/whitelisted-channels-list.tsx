// TODO: maybe remove this and all corresponsding whitelist stuff
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './channel-item'
import React from 'react'
import getWhitelistedChannelsController from '@/controllers/channels/get-whitelisted-channels.controller'
import { Address } from 'viem'

async function getWhitelistedChannels(address?: Address) {
  try {
    return getWhitelistedChannelsController(address)
  } catch (error) {
    return []
  }
}

export default async function WhitelistedChannelsList() {
  const cookiesData = await cookies()
  const address = getPublisherAddressFromSession(cookiesData)
  const channels = await getWhitelistedChannels(address)

  if (channels.length === 0) return <p className='text-center text-sm text-muted-foreground'>No Channels found</p>

  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem key={index} channel={channel} isOwner={address === channel.owner} userAddress={address} />
      ))}
    </React.Fragment>
  )
}
