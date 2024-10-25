import { Channel } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { Address, isAddress } from 'viem'

export default async function getAllChannelsUseCase(userAddress?: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  // Get followed channels if user address is provided
  const followedChannelAddrs = userAddress
    ? (await channelsRepo.getFollowedChannels(userAddress))
        .filter(({ channel_address }) => channel_address && isAddress(channel_address))
        .map(({ channel_address }) => channel_address)
    : []

  // Get unread notifications if user address is provided
  const unreadChannelAddrs = userAddress ? await channelsRepo.getNotifications(userAddress) : []

  // Get all channels
  const allChannelAddrs = await channelsRepo.getAllChannelAddresses()

  const channelsPromises = allChannelAddrs.map(async (address) => {
    const [channelResult, followersCount] = await Promise.all([
      channelsRepo.getChannelByAddress(address),
      channelsRepo.getFollowersCount(address),
    ])
    return { channelResult, followersCount }
  })

  const channelsWithCounts = await Promise.allSettled(channelsPromises)

  // Extract successful results and sort
  return channelsWithCounts
    .filter(
      (
        result,
      ): result is PromiseFulfilledResult<{
        channelResult: Channel
        followersCount: number
      }> => result.status === 'fulfilled',
    )
    .map((result) => ({
      ...result.value.channelResult,
      isFollowing: followedChannelAddrs.includes(result.value.channelResult.address),
      isUnread: unreadChannelAddrs.includes(result.value.channelResult.address),
      followersCount: result.value.followersCount,
    }))
    .sort((a, b) => {
      const getGroupWeight = (channel: Channel): number => {
        if (channel.isFollowing) return 0
        return 1
      }

      const aGroup = getGroupWeight(a)
      const bGroup = getGroupWeight(b)

      // If channels are in different groups, sort by group weight
      if (aGroup !== bGroup) {
        return aGroup - bGroup
      }

      // Within the same group, sort by followers count
      return b.followersCount - a.followersCount
    })
}
