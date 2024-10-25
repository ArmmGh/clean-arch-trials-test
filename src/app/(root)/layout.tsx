import AllChannelsList from '@/components/channels/all-channels-list'
import LoadingSkeleton from '@/components/layout/loading-skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ReactNode, Suspense } from 'react'

export default function App({ children }: { children: ReactNode }) {
  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden py-6'>
      <h1 className='mb-4 px-4 text-xl font-bold'>Global Channels</h1>
      <div className='border-1 flex flex-1 flex-row overflow-hidden'>
        <ScrollArea className='w-1/3 border-r'>
          <Suspense fallback={<LoadingSkeleton />}>
            <AllChannelsList />
          </Suspense>
        </ScrollArea>

        <ScrollArea className='w-2/3 p-6'>{children}</ScrollArea>
      </div>
    </div>
  )
}
