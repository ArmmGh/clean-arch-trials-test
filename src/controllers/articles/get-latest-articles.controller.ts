import { InputParseError } from '@/entities/errors/common'
import { Article } from '@/entities/models/article'
import { Channel } from '@/entities/models/channel'
import { gatewayedIpfsUrl, humanizeTimestamp, replaceAllUrlsToGateway } from '@/lib/utils'
import getLatestArticlesUseCase from '@/use-cases/articles/get-latest-articles.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

function presenter(articles: Array<Article & { channelAddress: Channel['channel_address'] }>) {
  return articles
    .sort((a, b) => Number(b.date) - Number(a.date))
    .map((article) => ({
      channelAddress: article.channelAddress,
      id: article.id,
      date: humanizeTimestamp(article.date),
      name: article.name,
      description: article.description,
      image: article.image.includes('ipfs')
        ? gatewayedIpfsUrl(article.image)
        : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
      // htmlContent: replaceAllUrlsToGateway(article.htmlContent),
    }))
}

const inputScheme = z.object({
  userAddress: z
    .string()
    .refine((val) => isAddress(val))
    .optional(),
})

export default async function getLatestArticlesController(input: z.infer<typeof inputScheme>) {
  try {
    const { data, error: inputParseError } = inputScheme.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const articles = await getLatestArticlesUseCase()

    return presenter(articles)
  } catch (error) {
    if (error instanceof InputParseError) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    return []
  }
}
