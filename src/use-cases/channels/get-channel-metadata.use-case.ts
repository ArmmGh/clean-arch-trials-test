import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getChannelMetadataUseCase(channelAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const channel = await channelsRepo.getChannelInContract(channelAddress)

  return {
    avatarUrl: channel.avatar_url,
    followers: 0,
    name: channel.name,
    address: channelAddress,
  }
}
