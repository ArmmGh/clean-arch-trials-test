import { Channel } from '@/entities/models/channel'
import getWhitelistedChannelsUseCase from '@/use-cases/channels/get-whitelisted-channels.use-case'
import { Address } from 'viem'

function presenter(data: Channel[]) {
  return data
}

export default async function getWhitelistedChannelsController(userAddress?: Address) {
  try {
    const channels = await getWhitelistedChannelsUseCase(userAddress)

    return presenter(channels)
  } catch (error) {
    console.log(error)

    return []
  }
}
