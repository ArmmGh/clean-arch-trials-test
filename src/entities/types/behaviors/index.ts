import { behaviorFollowRowSchema, behaviorsRowSchema, entityTypeSchema } from '@/database.schemas'
import { z } from 'zod'

export type BehaviorFollowRow = z.infer<typeof behaviorFollowRowSchema>
export type BehaviorRow = z.infer<typeof behaviorsRowSchema>

// TODO: maybe move to entities or common file
export type EntityType = z.infer<typeof entityTypeSchema>
