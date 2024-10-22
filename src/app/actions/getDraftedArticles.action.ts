'use server'

import { InputParseError } from '@/entities/errors/common'
import { DraftedArticle } from '@/entities/schemas/draftArticleSchema'
import { isAddress } from 'viem'
import { z } from 'zod'

function presenter(draftedArticles: DraftedArticle[]) {
  return draftedArticles.map(({ articleContent, channelAddress }) => ({
    articleContent,
    channelAddress,
  }))
}

const inputSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel Address' }),
})

export default async function getDraftedArticlesAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message, { cause: inputParseError })
    }

    // Call usecase

    // return presenter(draftedArticles)
  } catch (error) {
    console.error(error)
  }

  return []
}
