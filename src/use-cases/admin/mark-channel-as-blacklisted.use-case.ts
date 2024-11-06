import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function markChannelAsBlacklistedUseCase(channel: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  return channelsRepo.blacklistChannelRequest(channel)
}
