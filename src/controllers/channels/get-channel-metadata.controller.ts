import { InputParseError, SupabaseError } from '@/entities/errors/common'
import getChannelMetadataUseCase from '@/use-cases/channels/get-channel-metadata.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel address' }),
})

function presenter(metadata: { avatarUrl?: string | null; followers?: number; name?: string | null }) {
  return {
    avatarUrl: metadata.avatarUrl || '/placeholder.svg',
    followers: String(metadata.followers) || '0',
    name: metadata.name || '',
  }
}

export type PresentedChannelMetadata = ReturnType<typeof presenter>

export default async function getChannelMetadataController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message, { cause: inputParseError })
    }

    const metadata = await getChannelMetadataUseCase(data.channelAddress)

    return presenter(metadata)
  } catch (error) {
    if (error instanceof SupabaseError || error instanceof InputParseError) {
      console.error(error.message)
    }

    return null
  }
}
