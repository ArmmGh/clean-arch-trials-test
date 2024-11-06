import { AuthorizeError, InputParseError } from '@/entities/errors/common'
import blacklistChannelUseCase from '@/use-cases/admin/blacklist-channel.use-case'
import { Address, isAddress, isHash } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  txHash: z.string().refine((value) => isHash(value)),
  channelAddress: z.string().refine((value) => isAddress(value)),
})

export default async function blacklistChannelController(input: z.infer<typeof inputSchema>, sessionAddress: Address) {
  if (!sessionAddress) {
    throw new AuthorizeError('Unauthorized')
  }

  const { data, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError(inputParseError.message)
  }

  return blacklistChannelUseCase(data.txHash, data.channelAddress)
}
