import { channelsRowSchema } from '@/database.schemas'
import { channelInContractSchema } from '@/entities/schemas/channels'
import { z } from 'zod'

export type ChannelRow = z.infer<typeof channelsRowSchema>
export type ChannelInContract = z.infer<typeof channelInContractSchema>
