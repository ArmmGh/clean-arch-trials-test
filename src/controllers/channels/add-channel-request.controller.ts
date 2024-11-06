import { InputParseError } from '@/entities/errors/common'
import AddChannelRequestUseCase from '@/use-cases/channels/add-channel-request.use-case'
import { isHash } from 'viem'
import { z } from 'zod'

const inputSchema = z.string().refine((val) => isHash(val))

export default async function addChannelRequestController(input: z.infer<typeof inputSchema>) {
  const { data: txHash, error: inputParseError } = inputSchema.safeParse(input)

  if (inputParseError) {
    throw new InputParseError('Invalid input data', { cause: inputParseError })
  }

  return await AddChannelRequestUseCase(txHash)
}
