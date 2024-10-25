'use server'

import { InputParseError, SupabaseError } from '@/entities/errors/common'
import markChannelAsReadUseCase from '@/use-cases/mark-channel-as-read.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  userAddress: z.string().refine((val) => isAddress(val)),
  channelAddress: z.string().refine((val) => isAddress(val)),
})

export default async function markChannelAsReadAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const markedAsRead = await markChannelAsReadUseCase(data.userAddress, data.channelAddress)

    if (!markedAsRead) {
      throw new SupabaseError('Failed to mark channel as read')
    }

    return { success: markedAsRead }
  } catch (error) {
    if (error instanceof InputParseError || error instanceof SupabaseError) {
      console.error(error.message)

      return { error: error.message }
    }

    console.error('Error in markChannelAsReadAction', error)
    return { error: 'An error occurred while processing the request' }
  }
}
