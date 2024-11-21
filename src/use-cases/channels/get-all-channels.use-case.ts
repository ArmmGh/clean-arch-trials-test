import { Channel } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getAllChannelsUseCase(userAddress?: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  // const channelAddresses = await channelsRepo.getAllChannelAddresses()

  const channels = await channelsRepo.getAllChannels()

  return channels

  // const [channels /*followersCounts*/] = await Promise.all([
  //   Promise.all(channelAddresses.map((channelAddress) => channelsRepo.getChannelByAddress(channelAddress))),
  //   //TODO: might be needed soon Promise.all(channelAddresses.map((channelAddress) => channelsRepo.getFollowersCount(channelAddress))),
  // ])

  // const followingStatuses = userAddress
  //   ? await Promise.all(
  //       channelAddresses.map((channelAddress) => channelsRepo.isUserFollowingChannel(channelAddress, userAddress)),
  //     )
  //   : null

  // return channelAddresses.map((address, index) => ({
  //   ...channels[index],
  //   // followersCount: followersCounts[index],
  //   status: 'whitelisted',
  //   address,
  //   isFollowing: followingStatuses ? followingStatuses[index] : false,
  // }))
}
