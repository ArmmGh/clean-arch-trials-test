import { ChannelInContract } from '@/entities/models/channel'
import { BehaviorFollowRow } from '@/entities/types/behaviors'
import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getSuggestedChannelsUseCase(userAddress?: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  const behaviorsRepo = getInjection('IBehaviorsRepository')

  const allChannelRows = await channelsRepo.getAllChannelRows()

  const behavior = userAddress ? await behaviorsRepo.getBehaviorByConsumerAddress(userAddress) : null

  const promisedFollowerCounts: Promise<number>[] = []
  const promisedFollowBehaviors: Promise<BehaviorFollowRow>[] = []
  const promisedChannelsInContracts: Promise<ChannelInContract | null>[] = []

  allChannelRows.forEach(({ channel_address, id }) => {
    const channelAddress = getAddress(channel_address)

    promisedFollowerCounts.push(channelsRepo.getFollowersCount(channelAddress))

    promisedChannelsInContracts.push(
      channelsRepo.getChannelInContract(channelAddress).catch((error) => {
        console.error(`Error fetching channel in contract for address ${channelAddress}:`, error)

        return null
      }),
    )

    if (behavior) {
      promisedFollowBehaviors.push(behaviorsRepo.getBehaviorFollowByEntity('Channel', id, behavior.id))
    }
  })

  const [followerCounts, followBehaviors, channelsInContracts] = await Promise.all([
    Promise.all(promisedFollowerCounts),
    behavior ? Promise.all(promisedFollowBehaviors) : [],
    Promise.all(promisedChannelsInContracts),
  ])

  return allChannelRows
    .map((channelRow, index) => {
      const channelInContract = channelsInContracts[index]
      if (!channelInContract) return null

      return {
        ...channelRow,
        ...channelInContract,
        followersCount: followerCounts[index],
        isFollowing: behavior ? !!followBehaviors[index] : false,
      }
    })
    .filter((channel) => channel !== null)
}
