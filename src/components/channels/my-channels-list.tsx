import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import ChannelItem from './_channel-item'
import React from 'react'
import getPublisherAllChannelsAction from '@/actions/_getPublisherAllChannels.action'
import { redirect } from 'next/navigation'
import getAddressFromSession from '@/actions/utils/get-address-from-session.util'
import getUserChannelsController from '@/controllers/channels/get-user-channels.controller'
import { Address } from 'viem'

const getUserChannels = async (address: Address) => {
  try {
    return getUserChannelsController({ userAddress: address })
  } catch (error) {
    return []
  }
}

export default async function MyChannelsList({ className }: { className?: string }) {
  // const cookiesData = await cookies()
  // const address = getPublisherAddressFromSession(cookiesData)
  const userAddress = await getAddressFromSession()

  if (!userAddress) return redirect('/')

  const userChannels = await getUserChannels(userAddress)

  // const checkIsOwner = (address: Address) => address === userAddress

  // const channels = await getPublisherAllChannelsAction({ publisherAddress: address })

  return (
    <React.Fragment>
      {userChannels.map((channel, index: any) => (
        <ChannelItem className={className} key={index} channel={channel} isOwner={true} userAddress={userAddress} />
      ))}
    </React.Fragment>
  )
}
