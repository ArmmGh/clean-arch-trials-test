import { z } from 'zod'

export const articleSchema = z.object({
  // id: z.string(),
  content: z.string().min(1),
  // username: z.string().min(3).max(31),
})

export type Article = z.infer<typeof articleSchema>
