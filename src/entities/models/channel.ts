import { isAddress } from 'viem'
import { z } from 'zod'
import { channelRequestStatusSchema } from '@/database.schemas'

export const channelInContractSchema = z.object({
  name: z.string(),
  owner: z.string(),
  symbol: z.string(),
})

export const channelSchema = z.object({
  ...channelInContractSchema.shape,
  isFollowing: z.boolean().optional(),
  followersCount: z.number().optional(),
  status: channelRequestStatusSchema,
  address: z
    .string()
    .min(1)
    .refine((val) => isAddress(val)),
})

export type ChannelInContract = z.infer<typeof channelInContractSchema>
export type Channel = z.infer<typeof channelSchema>
