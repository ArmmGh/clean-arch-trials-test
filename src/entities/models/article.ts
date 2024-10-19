import { create } from 'domain'
import { z } from 'zod'

export const articleSchema = z.object({
  // id: z.string(),
  channelAddress: z.string(),
  content: z.string().min(1),
  metadata: z.array(z.object({ key: z.string(), value: z.string() })),
  createdAt: z.date(),
  // username: z.string().min(3).max(31),
})

export type Article = z.infer<typeof articleSchema>
