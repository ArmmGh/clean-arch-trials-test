import { channelRequestStatusSchema } from '@/database.schemas'
import { isAddress } from 'viem'
import { z } from 'zod'

export const channelInContractSchema = z.object({
  name: z.string(),
  description: z.string(),
  owner: z.string().optional(),
  symbol: z.string().optional(),
  avatar_url: z.string().optional(),
  address: z
    .string()
    .refine((val) => isAddress(val))
    .optional(),
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
