import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './channel-item'
import React from 'react'
import getPublisherAllChannelsAction from '@/app/actions/getPublisherAllChannels.action'
import { redirect } from 'next/navigation'

export default async function MyChannelsList({ className }: { className?: string }) {
  const cookiesData = await cookies()
  const address = getPublisherAddressFromSession(cookiesData)

  if (!address) return redirect('/')

  const channels = await getPublisherAllChannelsAction({ publisherAddress: address })

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
