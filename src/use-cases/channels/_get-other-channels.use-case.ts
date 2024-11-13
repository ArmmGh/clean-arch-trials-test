import { Channel, ChannelInContract } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getOtherChannelsUseCase(userAddress?: Address): Promise<Channel[]> {
  const channelsRepo = getInjection('IChannelsRepository')
  const otherChannelRequests = await channelsRepo.getOtherChannelRequests()

  // Pre-process addresses to avoid repeated conversions
  const processedRequests = otherChannelRequests.map(({ channel_address, status }) => ({
    channelAddress: getAddress(channel_address),
    status,
  }))

  // Batch similar operations together
  const [channels, followersCounts] = await Promise.all([
    Promise.all(processedRequests.map(({ channelAddress }) => channelsRepo.getChannelByAddress(channelAddress))),
    Promise.all(processedRequests.map(({ channelAddress }) => channelsRepo.getFollowersCount(channelAddress))),
  ])

  // Conditionally fetch following statuses if userAddress is provided
  const followingStatuses = userAddress
    ? await Promise.all(
        processedRequests.map(({ channelAddress }) => channelsRepo.isUserFollowingChannel(channelAddress, userAddress)),
      )
    : null

  // Combine results
  return processedRequests.map((request, index) => ({
    ...channels[index],
    followersCount: followersCounts[index],
    status: request.status,
    address: request.channelAddress,
    isFollowing: followingStatuses ? followingStatuses[index] : false,
  }))
}
