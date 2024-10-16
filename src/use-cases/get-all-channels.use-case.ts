import { getInjection } from '@/lib/di/container'
import { zeroAddress } from 'viem'

export default async function getAllChannelsUseCase() {
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelIds = await channelsRepo.getAllChannelIds({ publisherAddress: zeroAddress })
  const promisedChannels = []

  for (const id of allChannelIds) {
    promisedChannels.push(channelsRepo.getChannelById({ id }))
  }

  return [
    {
      name: 'Channel 1',
      symbol: 'CH1',
      owner: '0x123',
      address: zeroAddress,
    },
    {
      name: 'Channel 2',
      symbol: 'CH2',
      owner: '0x456',
      address: zeroAddress,
    },
    {
      name: 'Channel 3',
      symbol: 'CH3',
      owner: '0x789',
      address: zeroAddress,
    },
  ]
  // return Promise.all(promisedChannels)
}
