import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getUserChannelsUseCase(userAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')

  const channelRows = await channelsRepo.getUserChannelRows(userAddress)

  const channels = await Promise.all(
    channelRows.map(({ channel_address }) => channelsRepo.getChannelInContract(getAddress(channel_address))),
  )

  return channelRows.map((channelRow, index) => ({
    ...channels[index],
    ...channelRow,
  }))
}
