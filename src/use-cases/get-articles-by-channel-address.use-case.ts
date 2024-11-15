import { Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'
import { base64ToJson } from '@/lib/utils'
import { Address } from 'viem'

export default async function getArticlesByChannelAddressUseCase(channelAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  const articlesRepo = getInjection('IArticlesRepository')
  const lastArticleId = await channelsRepo.getLastArticleId(channelAddress)

  if (!lastArticleId) {
    return []
  }

  const articleIds = Array.from({ length: Number(lastArticleId) }, (_, index) => index + 1)

  const promisedTokenURIs = articleIds.map((id) => articlesRepo.getArticleTokenURIById(channelAddress, id))
  const tokenURIs = await Promise.all(promisedTokenURIs)
  const articleTokenURIs = tokenURIs.map((tokenURI, index) => ({
    tokenURI,
    id: articleIds[index],
  }))

  const parsedArticles = articleTokenURIs.map(({ tokenURI, id }) => ({
    ...base64ToJson<Article>(tokenURI),
    id,
  }))

  const articlesWithContent = await Promise.all(
    parsedArticles.map(async (article) => {
      const htmlContent = await articlesRepo.getContentByCID(article.htmlContent)
      return {
        ...article,
        htmlContent,
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

  return articlesWithContent
}
