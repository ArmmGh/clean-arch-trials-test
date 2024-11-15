import { InputParseError } from '@/entities/errors/common'
import { Article } from '@/entities/models/article'
import { gatewayedIpfsUrl, getTimeAgo, replaceAllUrlsToGateway } from '@/lib/utils'
import getArticleUseCase from '@/use-cases/articles/get-article.use-case'
import { secondsToMilliseconds } from 'date-fns'
import { isAddress } from 'viem'
import { z } from 'zod'

function presenter({ date: timestamp, description, htmlContent, id, image, name, emojis }: Article) {
  const formattedTimestamp = typeof timestamp === 'number' ? timestamp : Number(timestamp)
  const formattedDate = new Date(secondsToMilliseconds(formattedTimestamp))
  const date = getTimeAgo(formattedDate)

  return {
    date,
    description,
    htmlContent: replaceAllUrlsToGateway(htmlContent),
    id,
    image: gatewayedIpfsUrl(image),
    name,
    emojis,
  }
}

const inputSchema = z.object({
  articleId: z.string(),
  channelAddress: z.string().refine((val) => isAddress(val)),
})

export default async function getArticleController(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error } = inputSchema.safeParse(input)

    if (error) {
      throw new InputParseError(error.message)
    }

    const article = await getArticleUseCase(data.channelAddress, data.articleId)

    return presenter(article)
  } catch (error) {
    if (error instanceof InputParseError) {
      console.error(error.message)
    } else {
      console.error(error)
    }

    return null
  }
}
