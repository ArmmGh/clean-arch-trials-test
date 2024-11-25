import { towersRowSchema } from '@/database.schemas'
import { sidebarTowerSchema, towerInContractSchema } from '@/entities/schemas/towers'
import { z } from 'zod'

export type TowerRow = z.infer<typeof towersRowSchema>
export type TowerInContract = z.infer<typeof towerInContractSchema>

export type Tower = TowerRow & TowerInContract
export type SidebarTower = Tower & { shots: number }
// export type SidebarTower = z.infer<typeof sidebarTowerSchema>
