'use server'

import { DraftLimitExceed, InputParseError } from '@/entities/errors/common'
import createArticleUseCase from '@/use-cases/articles/create-article.use-case'
import { isAddress, isHash } from 'viem'
import { z } from 'zod'

const inputSchema = z.object({
  hash: z.string().refine((value) => isHash(value)),
  channelAddress: z.string().refine((value) => isAddress(value)),
})

// TODO: Rename and check the rest connected functionalities
export default async function createArticleAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    await createArticleUseCase(data.hash, data.channelAddress)
  } catch (error) {
    console.log('error', error)

    if (error instanceof InputParseError || error instanceof DraftLimitExceed) {
      return { error: error.message, metadata: null }
    }

    return { error: 'Something went wrong while saving the article' }
  }

  return { success: true }
}
