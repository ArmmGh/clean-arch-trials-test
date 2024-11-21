import { Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'
import { Address } from 'viem'

export default async function getArticlesByChannelAddressUseCase(channelAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  const pubsRepo = getInjection('IPublicationsRepository')
  const articlesRepo = getInjection('IArticlesRepository')

  const channelId = await channelsRepo.getChannelIdByAddress(channelAddress)
  const pubs = await pubsRepo.getPublicationsByChannelId(channelId)
  const lastPubNftId = pubs.at(-1)?.publication_index

  if (!lastPubNftId) {
    return []
  }

  const pubNftIds = pubs.map((pub) => pub.publication_index).filter((nftId) => nftId !== null)
  const pubIds = pubs.map((pub) => pub.publication_index).filter((nftId) => nftId !== null)
  const promisedTokenURIs = pubNftIds.map((nftId) => articlesRepo.getArticleTokenURIByNftId(channelAddress, nftId))
  const tokenURIs = await Promise.all(promisedTokenURIs)

  // TODO: change <Article> to correct <Publication> type
  const parsedPublications = tokenURIs.map((tokenURI, idx) => ({
    ...base64ToJson<Article>(tokenURI),
    nftId: pubNftIds[idx],
    id: pubIds[idx],
  }))

  const publicationsWithContent = await Promise.all(
    parsedPublications.map(async (pub) => {
      const htmlContent = await articlesRepo.getContentByCID(pub.htmlContent)

      return {
        ...pub,
        htmlContent: await prepareIpfsContent(htmlContent),
        emojis: [
          { emoji: '👍', count: 100 },
          {
            emoji: '🔥',
            count: 5,
          },
          {
            emoji: '👎',
            count: 2,
          },
        ],
      }
    }),
  )

  return publicationsWithContent
}
