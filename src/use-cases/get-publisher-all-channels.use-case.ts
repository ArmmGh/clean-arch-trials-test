import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getPublisherAllChannelsUseCase(publisherAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelAddrs = await channelsRepo.getAllPublisherChannelAddresses(publisherAddress)

  const channelsPromises = allChannelAddrs.map(async (address) => {
    const [channelResult, followersCount] = await Promise.all([
      channelsRepo._getChannelByAddress(getAddress(address)),
      channelsRepo.getFollowersCount(getAddress(address)),
    ])
    return { channelResult, followersCount }
  })

  const channelsWithCounts = await Promise.allSettled(channelsPromises)

  return channelsWithCounts
    .filter((result) => result.status === 'fulfilled')
    .map((result) => ({
      ...result.value.channelResult,
      followersCount: result.value.followersCount,
    }))
    .sort((a, b) => {
      return b.followersCount - a.followersCount
    })
}
