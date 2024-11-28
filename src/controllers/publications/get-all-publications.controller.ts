import { InputParseError } from '@/entities/errors/common'
import { PublicationInHomePage } from '@/entities/models/publication'
import { defaultChain } from '@/lib/config/chains'
import { gatewayedIpfsUrl, getTimeAgoFromTimestamp } from '@/lib/utils'
import getAllPublicationsUseCase from '@/use-cases/publications/get-all-publications.use-case'

function presenter(publications: PublicationInHomePage[]) {
  return publications
    .sort((a, b) => Number(b.date) - Number(a.date))
    .map(({ channel, ...publication }) => ({
      channelAddress: channel.address || 'Unknown',
      channelImage: channel.avatarUrl || gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
      channelName: channel.name || 'Unknown',

      href: `${defaultChain.blockExplorers?.default.url}/token/${channel.address}/instance/${publication.index}/metadata`,

      index: publication.index,
      date: getTimeAgoFromTimestamp(publication.date),
      name: publication.name,
      description: publication.description,
      image: publication.image.startsWith('ipfs://')
        ? gatewayedIpfsUrl(publication.image)
        : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
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
