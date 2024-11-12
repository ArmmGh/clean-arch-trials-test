import { Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'
import { base64ToJson } from '@/lib/utils'
import { Address } from 'viem'

export default async function getLatestArticlesUseCase(userAddress?: Address): Promise<Article[]> {
  const articlesRepo = getInjection('IArticlesRepository')
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelAddresses = await channelsRepo.getAllChannelAddresses()

  // Get all last article IDs
  const lastArticleIds = await Promise.all(
    allChannelAddresses.map((channelAddress) => channelsRepo.getLastArticleId(channelAddress)),
  )

  // Get articles with proper error handling and filtering
  const rawArticles = await Promise.all(
    allChannelAddresses.map(async (channelAddress, idx) => {
      const articleId = lastArticleIds[idx]

      if (!articleId) return null

      const article = await channelsRepo.getArticleById(channelAddress, Number(articleId))

      return {
        article,
        channelAddress,
      }
    }),
  )

  // Filter out null values and parse articles
  const validRawArticles = rawArticles.filter(
    (item): item is { article: string; channelAddress: Address } => !!item?.article,
  )
  const parsedArticles = validRawArticles.map((item) => ({
    ...base64ToJson<Article>(item.article),
    channelAddress: item.channelAddress,
  }))

  // Get HTML content for valid articles
  const articlesWithContent = await Promise.all(
    parsedArticles.map(async (article) => {
      const htmlContent = await articlesRepo.getContentByCID(article.htmlContent)

      return {
        ...article,
        htmlContent,
        channelAddress: article.channelAddress,
      }
    }),
  )

  // Filter out any null results from HTML content fetching
  return articlesWithContent.filter((article): article is Article & { channelAddress: Address } => !!article)
}
