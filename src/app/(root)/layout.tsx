import OtherChannelsList from '@/components/channels/other-channels-list'
import AllChannelsList from '@/components/channels/all-channels-list'
import LoadingSkeleton from '@/components/layout/loading-skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode, Suspense } from 'react'

export default function App({ children }: { children: ReactNode }) {
  return (
    <Tabs
      defaultValue='whitelist'
      className='mx-auto flex w-full max-w-screen-xl flex-1 flex-col space-y-4 overflow-hidden py-6'
    >
      <TabsList className='mx-auto grid w-[400px] grid-cols-2'>
        <TabsTrigger value='whitelist'>Whitelist</TabsTrigger>
        <TabsTrigger value='others'>Others</TabsTrigger>
      </TabsList>

      <div className='border-1 flex flex-1 flex-row overflow-hidden'>
        <ScrollArea className='w-1/3 flex-1 border-r'>
          <TabsContent value='whitelist'>
            <Suspense fallback={<LoadingSkeleton />}>
              <AllChannelsList />
            </Suspense>
          </TabsContent>
          <TabsContent value='others'>
            <Suspense fallback={<LoadingSkeleton />}>
              <OtherChannelsList />
            </Suspense>
          </TabsContent>
        </ScrollArea>

        <ScrollArea className='w-2/3 p-6'>{children}</ScrollArea>
      </div>
    </Tabs>
  )
}
