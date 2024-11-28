import { z } from 'zod'
import { channelsRowSchema } from '@/database.schemas'
import { channelInContractSchema } from '../schemas/channels'

export type ChannelRow = z.infer<typeof channelsRowSchema>
export type ChannelInContract = z.infer<typeof channelInContractSchema>
export type Channel = ChannelRow & ChannelInContract
export type SuggestedChannel = Channel & { followersCount: number; isFollowing: boolean }
