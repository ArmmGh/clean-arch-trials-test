import { z } from 'zod'

export const createChannelSchema = z.object({
  nftName: z.string().trim().min(1),
  description: z.string().trim().min(1),
})
