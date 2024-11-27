import { publicationsRowSchema } from '@/database.schemas'
import { z } from 'zod'
import { publicationMetadataSchema } from '@/entities/schemas/publications'

export type PublicationRow = z.infer<typeof publicationsRowSchema>
export type PublicationMetadata = z.infer<typeof publicationMetadataSchema>
export type PublicationPreview = PublicationMetadata & { index: number }
export type Publication = PublicationPreview
