import { UnauthorizeError, InputParseError } from '@/entities/errors/common'
import markChannelAsBlacklistedUseCase from '@/use-cases/admin/mark-channel-as-blacklisted.use-case'

import { Address, isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  channel: z.string().refine((val) => isAddress(val)),
})

export default async function markChannelAsBlacklistedController(
  input: z.infer<typeof inputSchema>,
  sessionAddress: Address,
) {
  if (!sessionAddress) {
    throw new UnauthorizeError('Unauthorized')
  }

  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError(inputParseError.message)
  }

  return markChannelAsBlacklistedUseCase(data.channel)
}
