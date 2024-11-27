import { InputParseError } from '@/entities/errors/common'
import { PublicationMetadata, PublicationPreview } from '@/entities/models/publication'
import { gatewayedIpfsUrl, getTimeAgoFromTimestamp } from '@/lib/utils'
import getPublicationsByChannelAddressUseCase from '@/use-cases/publications/get-publications-by-channel-address.use-case'
import { ContractFunctionExecutionError, isAddress } from 'viem'
import { z } from 'zod'

function presenter(publications: PublicationPreview[]) {
  return publications
    .sort((a, b) => Number(b.date) - Number(a.date))
    .map((publication) => ({
      index: publication.index,
      // channelAvatarUrl: publication.channelAvatarUrl, //TODO: maybe revert and fix?
      date: getTimeAgoFromTimestamp(publication.date),
      name: publication.name,
      description: publication.description,
      image: publication.image.includes('ipfs')
        ? gatewayedIpfsUrl(publication.image)
        : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
      htmlContent: publication.htmlContent, // TODO: temporarily added to support old-article
    }))
}

export type PresentedPublication = ReturnType<typeof presenter>[number]

const inputSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel address' }),
})

export default async function getPublicationsByChannelAddressController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new Error(inputParseError.message, { cause: inputParseError })
    }

    const publications = await getPublicationsByChannelAddressUseCase(data.channelAddress)

    return presenter(publications)
  } catch (error) {
    console.error(error)

    if (error instanceof InputParseError || error instanceof ContractFunctionExecutionError) {
      console.error(error.message)
    }

    return []
  }
}
