import { Publication, PublicationMetadata } from '@/entities/models/publication'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'
import { Address } from 'viem'

export default async function getPublicationUseCase(
  channelAddress: Address,
  publicationIndex: bigint,
): Promise<Publication> {
  const pubsRepo = getInjection('IPublicationsRepository')

  const tokenURI = await pubsRepo.getPublicationTokenUri(channelAddress, publicationIndex)
  const metadata = base64ToJson<PublicationMetadata>(tokenURI)

  const rawContent = await pubsRepo.getContentByCID(metadata.htmlContent)
  const content = await prepareIpfsContent(rawContent)

  return {
    ...metadata,
    htmlContent: content,
    index: Number(publicationIndex),
  }
}
