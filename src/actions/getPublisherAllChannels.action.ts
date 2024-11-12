import { InputParseError } from '@/entities/errors/common'
import getPublisherAllChannelsUseCase from '@/use-cases/get-publisher-all-channels.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  publisherAddress: z.string().refine((value) => isAddress(value)),
})

export default async function getPublisherAllChannelsAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError('Invalid address', { cause: inputParseError })
    }

    // const channels = await getPublisherAllChannelIdsUseCase({ publisherAddress: data.publisherAddress })
    const channels = await getPublisherAllChannelsUseCase(data.publisherAddress)

    return channels
  } catch (error) {
    console.error(error)
  }

  return []
}
