import { SidebarTower, TowerInContract } from '@/entities/types/towers'
import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getTowersUseCase() {
  const towersRepo = getInjection('ITowersRepository')

  const towerRows = await towersRepo.getTowerRows()

  const promisedTowersInContract: Promise<TowerInContract>[] = []
  const promisedTowersShots: Promise<number>[] = []

  towerRows.forEach(({ tower_address }) => {
    promisedTowersInContract.push(towersRepo.getTowerInContract(tower_address as Address))
    promisedTowersShots.push(towersRepo.getTowerShotsCount(tower_address as Address))
  })

  const [towersInContract, towersShots] = await Promise.all([
    Promise.all(promisedTowersInContract),
    Promise.all(promisedTowersShots),
  ])

  return towerRows.map((towerRow, index) => ({
    ...towerRow,
    ...towersInContract[index],
    shots: towersShots[index],
  }))
}
