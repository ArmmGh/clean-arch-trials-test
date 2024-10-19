import { getInjection } from '@/lib/di/container'

export default async function getAllChannelsUseCase() {
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelAddrs = await channelsRepo.getAllChannelAddresses()
  const promisedChannels = []

  for (const channelAddress of allChannelAddrs) {
    promisedChannels.push(channelsRepo.getChannelByAddress(channelAddress))
  }

  const channels = await Promise.allSettled(promisedChannels)

  return channels.filter((channel) => channel.status === 'fulfilled').map((channel) => channel.value)
}
