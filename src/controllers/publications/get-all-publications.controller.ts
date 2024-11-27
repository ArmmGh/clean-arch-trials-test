import { InputParseError } from '@/entities/errors/common'
import { PublicationInHomePage } from '@/entities/models/publication'
import { gatewayedIpfsUrl, humanizeTimestamp } from '@/lib/utils'
import getAllPublicationsUseCase from '@/use-cases/publications/get-all-publications.use-case'

function presenter(publications: PublicationInHomePage[]) {
  return publications
    .sort((a, b) => Number(b.date) - Number(a.date))
    .map((publication) => ({
      channelAddress: publication.channelAddress,
      // id: publication.id,
      // channelMetadata: publication.channelMetadata,
      date: humanizeTimestamp(publication.date),
      name: publication.name,
      description: publication.description,
      image: publication.image.startsWith('ipfs://')
        ? gatewayedIpfsUrl(publication.image)
        : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
      // htmlContent: replaceAllUrlsToGateway(article.htmlContent),
    }))
}

export default async function getAllPublicationsController() {
  try {
    const publications = await getAllPublicationsUseCase()

    return presenter(publications)
  } catch (error) {
    if (error instanceof InputParseError) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    return []
  }
}
