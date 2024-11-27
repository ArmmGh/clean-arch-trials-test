import { InputParseError } from '@/entities/errors/common'
import { Publication } from '@/entities/models/publication'
import { gatewayedIpfsUrl, getTimeAgoFromTimestamp, replaceAllUrlsToGateway } from '@/lib/utils'
import getPublicationUseCase from '@/use-cases/publications/get-publication.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

// TODO: fix any
function presenter({ date: timestamp, description, htmlContent, image, name, index }: Publication) {
  const date = getTimeAgoFromTimestamp(timestamp)

  return {
    date,
    description,
    htmlContent: replaceAllUrlsToGateway(htmlContent),
    index,
    image: image.startsWith('ipfs://')
      ? gatewayedIpfsUrl(image)
      : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
    name,
  }
}

const inputSchema = z.object({
  publicationIndex: z.bigint(),
  channelAddress: z.string().refine((val) => isAddress(val)),
})

export default async function getPublicationController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error } = inputSchema.safeParse(input)

    if (error) {
      throw new InputParseError(error.message)
    }

    const publication = await getPublicationUseCase(data.channelAddress, data.publicationIndex)

    return presenter(publication)
  } catch (error) {
    if (error instanceof InputParseError) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    return null
  }
}
