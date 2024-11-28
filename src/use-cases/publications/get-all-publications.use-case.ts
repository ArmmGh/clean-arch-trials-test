import { PublicationInHomePage, PublicationMetadata } from '@/entities/models/publication'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'
import { getAddress } from 'viem'

export default async function getAllPublicationsUseCase() {
  const pubsRepo = getInjection('IPublicationsRepository')
  const channelsRepo = getInjection('IChannelsRepository')

  const channelRows = await channelsRepo.getAllChannelRows()
  const channelAddresses = channelRows.map((row) => getAddress(row.channel_address))

  const publications: PublicationInHomePage[] = []

  await Promise.all(
    channelAddresses.map(async (channelAddress) => {
      const [channel, lastPublicationIndex] = await Promise.all([
        channelsRepo.getChannelInContract(channelAddress).catch(() => {}),
        pubsRepo.getLastPublicationIndexByChannel(channelAddress).catch(() => BigInt(0)),
      ])

      const promisedTokenUris = Array.from({ length: Number(lastPublicationIndex) }, (_, idx) => {
        const publicationIndex = BigInt(idx + 1)

        return pubsRepo.getPublicationTokenUri(channelAddress, publicationIndex).catch(() => '')
      })

      const jsonPublications = (await Promise.all(promisedTokenUris)).map((tokenURI) =>
        base64ToJson<PublicationMetadata>(tokenURI),
      )

      const publicationsContents = await Promise.all(
        jsonPublications.map((json) => pubsRepo.getContentByCID(json.htmlContent)),
      )

      const parsedContents = await Promise.all(publicationsContents.map((rawContent) => prepareIpfsContent(rawContent)))

      jsonPublications.forEach((pub, index) => {
        publications.push({
          ...pub,
          htmlContent: parsedContents[index],
          index: index + 1,
          channel: {
            address: channelAddress,
            name: channel?.name,
            avatarUrl: channel?.avatar_url,
          },
        })
      })
    }),
  )

  return publications
}
