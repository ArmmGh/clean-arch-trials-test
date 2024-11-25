import getUserChannelsUseCase from '@/use-cases/channels/get-user-channels.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputScheme = z.object({
  userAddress: z.string().refine((value) => isAddress(value)),
})

export default function getUserChannelsController(input: z.infer<typeof inputScheme>) {
  try {
    const { data, error: inputParseError } = inputScheme.safeParse(input)

    if (inputParseError) {
      throw new Error('Invalid address')
    }

    const userChannels = getUserChannelsUseCase(data.userAddress)

    return userChannels
  } catch (error) {
    console.error(error)

    return []
  }
}
