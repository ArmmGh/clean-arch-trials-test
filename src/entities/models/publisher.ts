import { Address } from 'viem'
import { z } from 'zod'

export const publisherSchema = z.object({
  id: z.string(),
  address: z.string(), // TODO: maybe include Viem Address type
  username: z.string().min(3).max(31),
})

export type Publisher = z.infer<typeof publisherSchema>
