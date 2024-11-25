import SidebarBodySkeleton from '@/components/skeletons/sidebar-body.skeleton'
import DefaultPage from './default-page'
import { Suspense } from 'react'

export default function AppSidebarPage() {
  return (
    <Suspense fallback={<SidebarBodySkeleton />}>
      <DefaultPage />
    </Suspense>
  )
}
