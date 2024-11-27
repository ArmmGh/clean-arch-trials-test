import { PublicationMetadata } from '@/entities/models/publication'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'
import { Address } from 'viem'

export default async function getPublicationsByChannelAddressUseCase(channelAddress: Address) {
  const pubsRepo = getInjection('IPublicationsRepository')

  const lastPubIndex = await pubsRepo.getLastPublicationIndexByChannel(channelAddress)

  if (!lastPubIndex) {
    return []
  }

  const promisedPubTokenUris = []
  for (let pubIndex = 1; pubIndex <= lastPubIndex; pubIndex++) {
    promisedPubTokenUris.push(pubsRepo.getPublicationTokenUri(channelAddress, BigInt(pubIndex)))
  }
  const pubTokenUris = await Promise.all(promisedPubTokenUris)

  const pubMetadatas = pubTokenUris.map((tokenURI) => base64ToJson<PublicationMetadata>(tokenURI))

  const promisedPubRawContents = pubMetadatas.map((metadata) => pubsRepo.getContentByCID(metadata.htmlContent))
  const pubRawContents = await Promise.all(promisedPubRawContents)

  const promisedPubContents = pubRawContents.map((rawContent) => prepareIpfsContent(rawContent))
  const pubParsedContents = await Promise.all(promisedPubContents)

  return pubMetadatas.map((metadata, idx) => ({
    ...metadata,
    htmlContent: pubParsedContents[idx],
    index: idx + 1,
  }))
}
