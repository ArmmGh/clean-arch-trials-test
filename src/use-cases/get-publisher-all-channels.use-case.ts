import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getPublisherAllChannelsUseCase(publisherAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelAddrs = await channelsRepo.getAllPublisherChannelAddresses(publisherAddress)
  const promisedChannels = []

  for (const channelAddress of allChannelAddrs) {
    promisedChannels.push(channelsRepo.getChannelByAddress(getAddress(channelAddress)))
  }
  return Promise.all(promisedChannels)
}
