import { towersRowSchema } from '@/database.schemas'
import { z } from 'zod'

export const towerInContractSchema = z.object({
  announcementsPerBlock: z.bigint(),
  price: z.bigint(),
  minPrice: z.bigint(),
  priceIncrease: z.bigint(),
  windowSize: z.bigint(),
  oldestTrackedBlock: z.bigint(),
  totalAnnouncementsInWindow: z.bigint(),
})

export const sidebarTowerSchema = z.object({
  ...towerInContractSchema.shape,
  ...towersRowSchema.shape,
  shots: z.number(),
})
