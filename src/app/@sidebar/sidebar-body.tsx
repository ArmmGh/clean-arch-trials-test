'use client'

import { Address } from 'viem'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { use } from 'react'
import { useParams } from 'next/navigation'
import ChannelItem from '@/components/channels/channel-item'
import CurrentChannelItem from '@/components/channels/current-channel-item'
import { PresentedChannel } from '@/controllers/channels/get-all-channels.controller'

export default function SidebarBody({
  promisedChannels,
  userAddress,
}: {
  promisedChannels: Promise<{ channels: PresentedChannel[]; isLeaderboard: boolean }>
  userAddress?: Address
}) {
  const { channels, isLeaderboard } = use(promisedChannels)
  const { address } = useParams<{ address?: Address }>()

  const activeChannel = channels?.find(({ channel_address }) => channel_address === address)
  const showFollowButton = !!(isLeaderboard && userAddress)

  return (
    <>
      {activeChannel && (
        <SidebarGroup>
          <SidebarGroupLabel className='px-0 text-lg font-semibold text-black'>Current</SidebarGroupLabel>

          <CurrentChannelItem address={activeChannel.channel_address} name={activeChannel?.name} />
        </SidebarGroup>
      )}

      <SidebarGroupLabel className='px-5 text-lg font-semibold text-black'>
        {isLeaderboard ? 'Leaderboard' : 'Following'}
      </SidebarGroupLabel>
      <SidebarContent>
        <SidebarGroup className='gap-3'>
          <SidebarGroupContent>
            {channels?.map((channel, index) => (
              <ChannelItem
                key={index}
                address={channel.channel_address}
                name={channel.name}
                symbol={channel.description}
                withFollowButton={showFollowButton}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}
