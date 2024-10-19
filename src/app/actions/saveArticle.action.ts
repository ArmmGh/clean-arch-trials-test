'use server'

import { DraftLimitExceed, InputParseError } from '@/entities/errors/common'
import saveArticleUseCase from '@/use-cases/save-article.use-case'
import { isAddress } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  channelAddress: z.string().refine((addrs) => isAddress(addrs), { message: 'Invalid channel address' }),
  article: z.object({
    content: z.string(),
    metadata: z.array(z.object({ key: z.string(), value: z.string() })),
  }),
})

export default async function saveArticleAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message, { cause: inputParseError })
    }

    const article = await saveArticleUseCase(data.channelAddress, data.article.content, data.article.metadata)

    if (!article) {
      throw new Error()
    }

    return { success: true, article }
  } catch (error) {
    console.log('error', error)

    if (error instanceof InputParseError || error instanceof DraftLimitExceed) {
      return { error: error.message, article: null }
    }

    return { error: 'Something went wrong while saving the article', article: null }
  }
}
