import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { Address } from 'viem'
import SidebarNavigation from '@/components/layout/sidebar/sidebar-navigation'
import getAllChannelsController from '@/controllers/channels/get-all-channels.controller'
import getFollowingChannelsController from '@/controllers/channels/get-following-channels.controller'
import ChannelItemInList from '@/components/channels/channel-item-in-list'

async function getChannels({ isLeaderboard, address }: { isLeaderboard?: boolean; address?: Address }) {
  try {
    if (isLeaderboard) {
      return getAllChannelsController()
    }

    if (address) {
      return getFollowingChannelsController(address)
    }
  } catch (error) {
    return []
  }
}

export default async function AppSidebar({ serverAddress }: { serverAddress?: Address }) {
  let channels = await getChannels({ address: serverAddress, isLeaderboard: false })
  let title = 'Following Channels'
  let isLeaderboard = false

  if (!channels?.length || !serverAddress) {
    channels = await getChannels({ isLeaderboard: true })
    title = 'Leaderboard'
    isLeaderboard = true
  }

  const showFollowButton = !!(isLeaderboard && serverAddress)

  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader />
      <SidebarNavigation />

      <SidebarGroupLabel className='text-lg font-semibold text-black'>{title}</SidebarGroupLabel>
      <SidebarContent>
        <SidebarGroup className='gap-3'>
          <SidebarGroupContent>
            {channels?.map((channel, index) => (
              <ChannelItemInList
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
      <SidebarFooter />
    </Sidebar>
  )
}

export const dynamic = 'force-dynamic'
