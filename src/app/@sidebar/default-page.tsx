import { Address } from 'viem'
import SidebarBody from '@/app/@sidebar/sidebar-body'
import getAllChannelsController, { PresentedChannel } from '@/controllers/channels/get-all-channels.controller'
import getAddressFromSession from '@/actions/utils/get-address-from-session.util'

async function getChannels({
  address,
}: {
  address?: Address
}): Promise<{ channels: PresentedChannel[]; isLeaderboard: boolean }> {
  try {
    const channels: PresentedChannel[] = []

    if (address) {
      // channels = await getFollowingChannelsController(address)
    }

    if (channels.length === 0) {
      return { channels: await getAllChannelsController(), isLeaderboard: true }
    }

    return { channels, isLeaderboard: false }
  } catch (error) {
    return { channels: [], isLeaderboard: true }
  }
}

async function DefaultPage() {
  const userAddress = await getAddressFromSession()
  const promisedChannels = getChannels({ address: userAddress })

  return <SidebarBody promisedChannels={promisedChannels} userAddress={userAddress} />
}

export default DefaultPage
