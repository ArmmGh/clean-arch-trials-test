import { z } from 'zod'

export const defaultPublicationMetadataSchema = z.object({
  description: z.string(),
  date: z.string(),
  externalUrl: z.string().url(),
  image: z.string(),
  name: z.string(),
})

export const publicationMetadataSchema = z.object({
  ...defaultPublicationMetadataSchema.shape,
  htmlContent: z.string(),
})
