import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

export default function ArticleItemSmallSkeleton() {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[170px] w-full'>
        <Skeleton className='h-full w-full rounded-2xl' />
      </div>

      <div className='flex flex-col gap-2 p-5'>
        <Skeleton className='h-4 w-full' />

        <Separator />

        <div className='flex items-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-full' />

          <Skeleton className='h-4 w-full flex-1' />
        </div>
      </div>
    </div>
  )
}
