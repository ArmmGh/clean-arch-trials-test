import { Tower, TowerInContract, TowerRow } from '@/entities/types/towers'
import { Address } from 'viem'

export interface ITowersRepository {
  getTowerRows(): Promise<TowerRow[]>
  getTowerInContract(towerAddress: Address): Promise<TowerInContract>
  getTowerShotsCount(towerAddress: Address): Promise<number>
}
