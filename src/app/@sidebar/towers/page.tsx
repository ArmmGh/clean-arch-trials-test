import getTowersController from '@/controllers/towers/get-towers.controller'
import SidebarTowerItem from './sidebar-tower-item'
import SidebarBodySkeleton from '@/components/skeletons/sidebar-body.skeleton'
import { Suspense } from 'react'

async function getTowers() {
  try {
    const towers = await getTowersController()

    return towers
  } catch (error) {
    return []
  }
}

async function TowersPage() {
  const towers = await getTowers()

  return (
    <div>
      {towers.map(
        (tower) => '',
        // <SidebarTowerItem />
      )}
    </div>
  )
}

export default TowersPage
