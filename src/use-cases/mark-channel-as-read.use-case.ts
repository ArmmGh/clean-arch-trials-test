import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function markChannelAsReadUseCase(userAddress: Address, channelAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const markedAsRead = await channelsRepo.markChannelAsRead(userAddress, channelAddress)

  return markedAsRead
}
