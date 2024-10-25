import getAllChannelsAction from '@/app/actions/get-all-channels.action'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './channel-item'
import { unstable_noStore as noStore } from 'next/cache'

import React from 'react'

export default async function AllChannelsList() {
  noStore()

  const address = getPublisherAddressFromSession(cookies())
  const channels = await getAllChannelsAction(address)

  return (
    <React.Fragment>
      {channels.map((channel, index: any) => (
        <ChannelItem
          key={index}
          channel={channel}
          isOwner={address === channel.owner}
          isFollowing={channel.isFollowing}
          followersCount={channel.followersCount}
          userAddress={address}
        />
      ))}
    </React.Fragment>
  )
}
