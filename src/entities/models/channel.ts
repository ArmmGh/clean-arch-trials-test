import { z } from 'zod'

export const channelSchema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
  symbol: z.string().min(1),
  address: z.string().min(1),
})

export type Channel = z.infer<typeof channelSchema>
