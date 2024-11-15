import { Sidebar, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar'
import { Address } from 'viem'
import SidebarNavigation from '@/components/layout/sidebar/sidebar-navigation'
import SidebarBody from './sidebar-body'
import { Suspense } from 'react'
import { Channel } from '@/entities/models/channel'
import getFollowingChannelsController from '@/controllers/channels/get-following-channels.controller'
import getAllChannelsController from '@/controllers/channels/get-all-channels.controller'

async function getChannels({
  address,
}: {
  address?: Address
}): Promise<{ channels: Channel[]; isLeaderboard: boolean }> {
  try {
    let channels: Channel[] = []

    if (address) {
      channels = await getFollowingChannelsController(address)
    }

    if (channels.length === 0) {
      return { channels: await getAllChannelsController(), isLeaderboard: true }
    }

    return { channels, isLeaderboard: false }
  } catch (error) {
    return { channels: [], isLeaderboard: true }
  }
}

export default function AppSidebar({ serverAddress: userAddress }: { serverAddress?: Address }) {
  const promisedChannels = getChannels({ address: userAddress })

  return (
    <Sidebar variant='sidebar'>
      <SidebarHeader />
      <SidebarNavigation />

      <Suspense fallback={<div>Loading......</div>}>
        <SidebarBody promisedChannels={promisedChannels} userAddress={userAddress} />
      </Suspense>

      <SidebarFooter />
    </Sidebar>
  )
}

export const dynamic = 'force-dynamic'
