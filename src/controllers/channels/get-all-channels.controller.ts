import { Channel } from '@/entities/models/channel'
import getAllChannelsUseCase from '@/use-cases/channels/get-all-channels.use-case'
import { Address, getAddress } from 'viem'

function presenter(data: Channel[]) {
  return data.map(({ channel_address, name, description, avatar_url, id }) => {
    return {
      channel_address: getAddress(channel_address),
      name: name || 'Unknown',
      description: description || 'No description',
      avatar_url,
      id,
    }
  })
}

export type PresentedChannel = ReturnType<typeof presenter>[number]

export default async function getAllChannelsController(userAddress?: Address) {
  try {
    const channels = await getAllChannelsUseCase(userAddress)

    return presenter(channels)
  } catch (error) {
    console.log(error)

    return []
  }
}
