import { isAddress } from 'viem'
import { z } from 'zod'

export const channelSchema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
  symbol: z.string().min(1),
  isFollowing: z.boolean().optional(),
  followersCount: z.number().optional(),
  isUnread: z.boolean().optional(),
  // TODO: maybe add isUnread
  address: z
    .string()
    .min(1)
    .refine((val) => isAddress(val)),
})

export type Channel = z.infer<typeof channelSchema>
