import { publicationsRowSchema } from '@/database.schemas'
import { z } from 'zod'

export type PublicationRow = z.infer<typeof publicationsRowSchema>
