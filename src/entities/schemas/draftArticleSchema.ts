import { isAddress } from 'viem'
import { z } from 'zod'

export const draftArticleSchema = z.object({
  channelAddress: z.string().refine((val) => isAddress(val), { message: 'Invalid Channel address' }),
  articleContent: z.string().min(1, { message: 'Article content cannot be empty' }),
})

export type DraftedArticle = z.infer<typeof draftArticleSchema>
