import { InputParseError } from '@/entities/errors/common'
import { Article } from '@/entities/models/article'
import { gatewayedIpfsUrl, humanizeTimestamp } from '@/lib/utils'
import getArticlesByChannelAddressUseCase from '@/use-cases/get-articles-by-channel-address.use-case'
import { ContractFunctionExecutionError, isAddress } from 'viem'
import { z } from 'zod'

function presenter(articles: Article[]) {
  return articles
    .sort((a, b) => Number(b.date) - Number(a.date))
    .map((article) => ({
      id: article.id,
      date: humanizeTimestamp(article.date),
      name: article.name,
      description: article.description,
      image: article.image.includes('ipfs')
        ? gatewayedIpfsUrl(article.image)
        : gatewayedIpfsUrl(`ipfs://${process.env.NEXT_PUBLIC_DEFAULT_METADATA_IMAGE}`),
      emojis: article.emojis,
      htmlContent: article.htmlContent, // TODO: temporarily added to support old-article
    }))
}

const inputSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel address' }),
})

export default async function getArticlesByChannelAddressController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new Error(inputParseError.message, { cause: inputParseError })
    }

    const articles = await getArticlesByChannelAddressUseCase(data.channelAddress)

    return presenter(articles)
  } catch (error) {
    console.error(error)

    if (error instanceof InputParseError || error instanceof ContractFunctionExecutionError) {
      console.error(error.message)
    }

    return []
  }
}
