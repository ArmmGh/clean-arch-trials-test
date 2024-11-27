import { z } from 'zod'

const defaultArticleSchema = z.object({
  description: z.string(),
  date: z.string(),
  externalUrl: z.string().url(),
  image: z.string(),
  name: z.string(),
})

export const getArticleSchema = z.object({
  ...defaultArticleSchema.shape,
  id: z.number(),
  nftId: z.number(),
  htmlContent: z.string(),
})

export type Article = z.infer<typeof getArticleSchema>
