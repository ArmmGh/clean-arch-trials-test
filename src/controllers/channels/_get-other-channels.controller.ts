import { InputParseError, SupabaseError } from '@/entities/errors/common'
import { Channel } from '@/entities/models/channel'
import getOtherChannelsUseCase from '@/use-cases/channels/_get-other-channels.use-case'
import { Address, isAddress } from 'viem'
import { z } from 'zod'

function presenter(data: Channel[]) {
  return data
}

const inputSchema = z
  .string()
  .refine((val) => isAddress(val))
  .optional()

export default async function getOtherChannelsController(userAddress?: Address) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(userAddress)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const channels = await getOtherChannelsUseCase(data)

    return presenter(channels)
  } catch (error) {
    if (error instanceof SupabaseError || error instanceof InputParseError) {
      console.error(error.message)
    } else {
      console.log(error)
    }

    return []
  }
}
