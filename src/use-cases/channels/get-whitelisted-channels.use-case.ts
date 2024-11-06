import { Channel } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getWhitelistedChannelsUseCase(userAddress?: Address): Promise<Channel[]> {
  const channelsRepo = getInjection('IChannelsRepository')
  const channelAddresses = await channelsRepo.getWhitelistedChannelAddresses()

  const [channels, followersCounts] = await Promise.all([
    Promise.all(channelAddresses.map((channelAddress) => channelsRepo.getChannelByAddress(channelAddress))),
    Promise.all(channelAddresses.map((channelAddress) => channelsRepo.getFollowersCount(channelAddress))),
  ])

  const followingStatuses = userAddress
    ? await Promise.all(
        channelAddresses.map((channelAddress) => channelsRepo.isUserFollowingChannel(channelAddress, userAddress)),
      )
    : null

  return channelAddresses.map((address, index) => ({
    ...channels[index],
    followersCount: followersCounts[index],
    status: 'whitelisted',
    address,
    isFollowing: followingStatuses ? followingStatuses[index] : false,
  }))
}
