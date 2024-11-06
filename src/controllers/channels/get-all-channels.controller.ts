import { Channel } from '@/entities/models/channel'
import getAllChannelsUseCase from '@/use-cases/channels/get-all-channels.use-case'
import { Address } from 'viem'

function presenter(data: Channel[]) {
  return data
}

export default async function getAllChannelsController(userAddress?: Address) {
  try {
    const channels = await getAllChannelsUseCase(userAddress)

    return presenter(channels)
  } catch (error) {
    console.log(error)

    return []
  }
}
