import { type Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'
import { base64ToJson, prepareIpfsContent, sanitizeArticleContent } from '@/lib/utils'
import { Address } from 'viem'

export default async function getArticleUseCase(channelAddress: Address, articleId: string): Promise<Article> {
  const articlesRepo = getInjection('IArticlesRepository')

  const tokenURI = await articlesRepo.getArticleTokenURIByNftId(channelAddress, articleId)

  const metadata = base64ToJson<Article>(tokenURI)

  const ipfsContent = await articlesRepo.getContentByCID(metadata.htmlContent)
  const ipfsSanitizedContent = await prepareIpfsContent(ipfsContent)

  return {
    ...metadata,
    htmlContent: ipfsSanitizedContent,
    id: Number(articleId),
    emojis: [
      { emoji: '👍', count: 100 },
      { emoji: '🔥', count: 5 },
      { emoji: '👎', count: 2 },
    ],
  }
}
