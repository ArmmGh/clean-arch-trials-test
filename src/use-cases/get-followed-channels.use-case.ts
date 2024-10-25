import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getFollowedChannelsUseCase(userAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  const rawFollowedChannels = await channelsRepo.getFollowedChannels(userAddress)

  return rawFollowedChannels
}
