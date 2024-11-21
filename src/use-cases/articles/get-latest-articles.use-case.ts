import { Article } from '@/entities/models/article'
import { Channel } from '@/entities/models/channel'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent } from '@/lib/utils'

export default async function getLatestArticlesUseCase(): Promise<
  Array<Article & { channelAddress: Channel['channel_address'] }>
> {
  const articlesRepo = getInjection('IArticlesRepository')
  const channelsRepo = getInjection('IChannelsRepository')

  const allChannelAddresses = await channelsRepo.getAllChannelAddresses()

  const lastArticleIds = await Promise.all(
    allChannelAddresses.map((channelAddress) => channelsRepo.getLastArticleId(channelAddress)),
  )

  const rawArticles = await Promise.all(
    allChannelAddresses.map(async (channelAddress, idx) => {
      const articleId = lastArticleIds[idx]

      if (!articleId) return null

      const tokenURI = await articlesRepo.getArticleTokenURIByNftId(channelAddress, Number(articleId))

      return {
        tokenURI,
        channelAddress,
        id: Number(articleId),
      }
    }),
  )

  const validRawArticles = rawArticles.filter((item) => item && item.tokenURI)
  const parsedArticles = validRawArticles.map((item) => ({
    ...base64ToJson<Article>(item?.tokenURI!),
    channelAddress: item?.channelAddress!,
    id: item?.id!,
  }))

  const articlesWithContent = await Promise.all(
    parsedArticles.map(async (article) => {
      const htmlContent = await articlesRepo.getContentByCID(article.htmlContent)

      return {
        ...article,
        htmlContent: await prepareIpfsContent(htmlContent),
        channelAddress: article.channelAddress,
      }
    }),
  )

  return articlesWithContent
}
