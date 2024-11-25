import { Suspense } from 'react'
import DefaultPage from '../default-page'
import SidebarBodySkeleton from '@/components/skeletons/sidebar-body.skeleton'

export default function AppSidebarRestPage() {
  return (
    <Suspense fallback={<SidebarBodySkeleton />}>
      <DefaultPage />
    </Suspense>
  )
}
