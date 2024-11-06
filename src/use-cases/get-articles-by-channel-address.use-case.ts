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

  const promisedArticles = []

  for (let articleId = 1; articleId <= Number(lastArticleId); articleId++) {
    promisedArticles.push(channelsRepo.getArticleById(channelAddress, articleId))
  }

  const rawArticles = await Promise.all(promisedArticles)
  const parsedArticles = rawArticles?.map((article) => base64ToJson<Article>(article))

  const articles = parsedArticles?.map(async (article) => {
    const htmlContent = await articlesRepo.getContentByCID(article.htmlContent)

    return {
      ...article,
      htmlContent,
    }
  })

  return Promise.all(articles)
}
