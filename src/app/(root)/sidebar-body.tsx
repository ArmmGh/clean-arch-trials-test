'use client'

import { Address } from 'viem'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { Channel } from '@/entities/models/channel'
import { use } from 'react'
import { useParams } from 'next/navigation'
import ChannelItem from '@/components/channels/channel-item'
import CurrentChannelItem from '@/components/channels/current-channel-item'

export default function SidebarBody({
  promisedChannels,
  userAddress,
}: {
  promisedChannels: Promise<{ channels: Channel[]; isLeaderboard: boolean }>
  userAddress?: Address
}) {
  const { channels, isLeaderboard } = use(promisedChannels)
  const { address } = useParams<{ address?: Address }>()

  const activeChannel = channels?.find((channel) => channel.address === address)
  const showFollowButton = !!(isLeaderboard && userAddress)
  const filteredChannels = channels?.filter((channel) => channel.address !== address)

  return (
    <>
      {activeChannel && (
        <SidebarGroup>
          <SidebarGroupLabel className='px-0 text-lg font-semibold text-black'>Current</SidebarGroupLabel>

          <CurrentChannelItem address={activeChannel.address} name={activeChannel.name} />
        </SidebarGroup>
      )}

      <SidebarGroupLabel className='px-5 text-lg font-semibold text-black'>
        {isLeaderboard ? 'Leaderboard' : 'Following'}
      </SidebarGroupLabel>
      <SidebarContent>
        <SidebarGroup className='gap-3'>
          <SidebarGroupContent>
            {filteredChannels?.map((channel, index) => (
              <ChannelItem
                key={index}
                address={channel.address}
                name={channel.name}
                symbol={channel.symbol}
                withFollowButton={showFollowButton}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  )
}
