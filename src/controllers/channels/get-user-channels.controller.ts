import { Channel } from '@/entities/models/channel'
import getUserChannelsUseCase from '@/use-cases/channels/get-user-channels.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputScheme = z.object({
  userAddress: z.string().refine((value) => isAddress(value)),
})

function presenter(channels: Channel[]) {
  return channels.map((channel) => ({
    address: channel.channel_address,
    name: channel.name,
    isFollowing: false,
  }))
}

export type PresentedUserChannel = ReturnType<typeof presenter>[number]

export default async function getUserChannelsController(input: z.infer<typeof inputScheme>) {
  try {
    const { data, error: inputParseError } = inputScheme.safeParse(input)

    if (inputParseError) {
      throw new Error('Invalid address')
    }

    const userChannels = await getUserChannelsUseCase(data.userAddress)

    return presenter(userChannels)
  } catch (error) {
    console.error(error)

    return []
  }
}
