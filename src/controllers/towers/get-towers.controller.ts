import { SidebarTower } from '@/entities/types/towers'
import getTowersUseCase from '@/use-cases/towers/get-towers.use-case'

function presenter(towers: SidebarTower[]) {
  return towers.map(({ name, shots, description }) => {
    return {
      name,
      shots,
      description,
    }
  })
}

export default async function getTowersController() {
  try {
    const towers = await getTowersUseCase()

    return presenter(towers)
  } catch (error) {
    return []
  }
}
