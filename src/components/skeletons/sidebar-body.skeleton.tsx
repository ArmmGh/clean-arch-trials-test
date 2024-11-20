import { Skeleton } from '@/components/ui/skeleton'

export default function SidebarBodySkeleton() {
  return (
    <div className='flex flex-col gap-2 px-5'>
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
      <Skeleton className='h-8 w-full' />
    </div>
  )
}
