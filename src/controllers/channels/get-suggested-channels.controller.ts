import { InputParseError } from '@/entities/errors/common'
import { SuggestedChannel } from '@/entities/models/channel'
import getSuggestedChannelsUseCase from '@/use-cases/channels/get-suggested-channels.use-case'
import { getAddress, isAddress } from 'viem'
import { z } from 'zod'

function presenter(suggestedChannels: SuggestedChannel[]) {
  return suggestedChannels.map(({ avatar_url, name, followersCount = 0, channel_address, isFollowing }) => ({
    avatarUrl: avatar_url || '/placeholder.svg',
    name: name || 'Unknown',
    followersCount: followersCount,
    address: getAddress(channel_address),
    isFollowing,
  }))
}

const inputSchema = z.object({
  userAddress: z
    .string()
    .refine((val) => isAddress(val))
    .optional(),
})

export default async function getSuggestedChannelsController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const suggestedChannels = await getSuggestedChannelsUseCase(data.userAddress)

    return presenter(suggestedChannels)
  } catch (error) {
    console.error(error)

    return []
  }
}
