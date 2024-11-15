import { Skeleton } from '@/components/ui/skeleton'

export default function ArticlePreviewSkeleton() {
  return (
    <div className='flex flex-col space-y-4 rounded-xl px-5 py-6 shadow-none'>
      <div className='flex items-center gap-3'>
        <Skeleton className='h-10 w-10 rounded-full' />

        <Skeleton className='h-5 w-full flex-1' />
      </div>

      <div className='flex flex-col p-0'>
        <div className='relative mb-4 aspect-[2/1] overflow-hidden rounded-[15px] lg:aspect-[2/1]'>
          <Skeleton className='h-full w-full rounded-2xl' />
        </div>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-6 w-1/3' />
          <Skeleton className='h-5 w-1/2' />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className='h-5 w-5 rounded-full' />
          ))}
        </div>

        <Skeleton className='h-5 w-32' />
      </div>
    </div>
  )
}
