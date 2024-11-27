import { Channel, ChannelInContract } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { Address, getAddress } from 'viem'

export default async function getAllChannelsUseCase(userAddress?: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  // const channelAddresses = await channelsRepo.getAllChannelAddresses()

  const channelRows = await channelsRepo.getAllChannelRows()
  const promisedChannelsInContracts: Promise<ChannelInContract | null>[] = []

  channelRows.forEach((channelRow) => {
    const channelAddress = getAddress(channelRow.channel_address)
    const channelPromise = channelsRepo.getChannelInContract(channelAddress).catch((error) => {
      console.error(`Error fetching channel in contract for address ${channelAddress}:`, error)

      return null
    })
    promisedChannelsInContracts.push(channelPromise)
  })

  const channelsInContracts = await Promise.all(promisedChannelsInContracts)

  return channelRows
    .map((channelRow, index) => {
      const channelInContract = channelsInContracts[index]
      if (!channelInContract) return null
      return {
        ...channelRow,
        ...channelInContract,
        address: getAddress(channelRow.channel_address),
      }
    })
    .filter((channel) => channel !== null)
}
