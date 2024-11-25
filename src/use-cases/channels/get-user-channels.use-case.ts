import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getUserChannelsUseCase(userAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const userChannels = []

  const channelRows = await channelsRepo.getUserChannelRows(userAddress)

  return channelRows
}
