import { PublicationMetadata } from '@/entities/models/publication'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'
import { getAddress } from 'viem'
import getChannelMetadataUseCase from '../channels/get-channel-metadata.use-case'

export default async function getAllPublicationsUseCase() {
  const pubsRepo = getInjection('IPublicationsRepository')
  const channelsRepo = getInjection('IChannelsRepository')

  const channelRows = await channelsRepo.getAllChannelRows()
  const channelAddresses = channelRows.map((row) => getAddress(row.channel_address))

  const promisedChannelMetadatas = channelAddresses.map((address) =>
    getChannelMetadataUseCase(address).catch(() => null),
  )
  const channelMetadatas = await Promise.all(promisedChannelMetadatas)

  const promisedLastPublicationIndexes = channelAddresses.map((channelAddress) =>
    pubsRepo.getLastPublicationIndexByChannel(channelAddress).catch(() => 0),
  )

  const lastPublicationIndexes = await Promise.all(promisedLastPublicationIndexes)

  const promisedPublicationTokenUris = []

  for (let i = 0; i < channelAddresses.length; i++) {
    const channelAddress = channelAddresses[i]
    const lastPublicationIndex = lastPublicationIndexes[i]

    for (let publicationIndex = 1; publicationIndex <= lastPublicationIndex; publicationIndex++) {
      promisedPublicationTokenUris.push(pubsRepo.getPublicationTokenUri(channelAddress, BigInt(publicationIndex)))
    }
  }

  const publicationTokenUris = await Promise.all(promisedPublicationTokenUris)
  const publicationMetadatas = publicationTokenUris.map((tokenURI) => base64ToJson<PublicationMetadata>(tokenURI))
  const promisedRawContents = publicationMetadatas.map((metadata) => pubsRepo.getContentByCID(metadata.htmlContent))
  const rawContents = await Promise.all(promisedRawContents)
  const promisedContents = rawContents.map((rawContent) => prepareIpfsContent(rawContent))
  const parsedContents = await Promise.all(promisedContents)

  return publicationMetadatas.map((metadata, idx) => ({
    ...metadata,
    channelAddress: channelAddresses[idx],
    htmlContent: parsedContents[idx],
    index: idx + 1,
    channelMetadata: channelMetadatas[idx],
  }))
}
