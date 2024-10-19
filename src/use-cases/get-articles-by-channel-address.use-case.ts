import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'
// import atob from 'atob'

export function base64ToJson(base64Data: string) {
  const base64String = base64Data.split(',')[1]

  // Step 2: Decode the base64 string using Buffer
  const decodedString = Buffer.from(base64String, 'base64').toString('utf-8')

  // Step 3: Parse the decoded string into a JSON object
  const jsonObject = JSON.parse(decodedString)

  return jsonObject
}

export default async function getArticlesByChannelAddressUseCase(channelAddress: Address) {
  const channelsRepo = getInjection('IChannelsRepository')
  const articlesRepo = getInjection('IArticlesRepository')
  const lastArticleId = await channelsRepo.getLastArticleId(channelAddress)
  const promisedArticles = []

  for (let articleId = 1; articleId <= Number(lastArticleId); articleId++) {
    promisedArticles.push(channelsRepo.getArticleById(channelAddress, articleId))
  }

  const rawArticles = await Promise.all(promisedArticles)
  const parsedArticles = rawArticles?.map((article) => base64ToJson(article))

  const promisedFinalArticles = parsedArticles?.map(async (article) => {
    const htmlContent = await articlesRepo.getContentByCID(article.htmlContent)
    return {
      ...article,
      htmlContent,
    }
  })

  return Promise.all(promisedFinalArticles)
}
