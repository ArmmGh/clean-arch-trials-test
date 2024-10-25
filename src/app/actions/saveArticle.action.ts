'use server'

import { DraftLimitExceed, InputParseError } from '@/entities/errors/common'
import saveArticleUseCase from '@/use-cases/save-article.use-case'
import { revalidatePath } from 'next/cache'
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

    const metadata = await saveArticleUseCase(data.channelAddress, data.article.content, data.article.metadata)

    revalidatePath('/dashboard')

    if (!metadata) {
      throw new Error()
    }

    return { success: true, metadata }
  } catch (error) {
    console.log('error', error)

    if (error instanceof InputParseError || error instanceof DraftLimitExceed) {
      return { error: error.message, metadata: null }
    }

    return { error: 'Something went wrong while saving the article', metadata: null }
  }
}
