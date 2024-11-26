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

  allChannelRows.forEach(({ channel_address, id }) => {
    promisedFollowerCounts.push(channelsRepo.getFollowersCount(getAddress(channel_address)))

    if (behavior) {
      promisedFollowBehaviors.push(behaviorsRepo.getBehaviorFollowByEntity('Channel', id, behavior.id))
    }
  })

  const [followerCounts, followBehaviors] = await Promise.all([
    Promise.all(promisedFollowerCounts),
    behavior ? Promise.all(promisedFollowBehaviors) : [],
  ])

  return allChannelRows.map((channelRow, index) => ({
    ...channelRow,
    followersCount: followerCounts[index],
    isFollowing: behavior ? !!followBehaviors[index] : false,
  }))
}
