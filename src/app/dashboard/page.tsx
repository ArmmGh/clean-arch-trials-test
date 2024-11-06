import ArticlesList from '@/components/articles/articles-list'
import LoadingSkeleton from '@/components/layout/loading-skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import getPublisherAllChannelsAction from '@/app/actions/getPublisherAllChannels.action'
import NoChannels from '@/components/channels/no-channels'
import AbstractChannelsList from '@/components/channels/abstract-channels-list'

// TODO: duplicated
type SearchParams = {
  channel?: string
}

export default async function Dashboard(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams
  const { channel: activeChannelAddress } = searchParams
  const cookiesData = await cookies()
  const address = getPublisherAddressFromSession(cookiesData)

  if (!address) return redirect('/')

  const channels = await getPublisherAllChannelsAction({ publisherAddress: address })

  if (!channels.length) return <NoChannels className='py-4' />

  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden py-6'>
      <h1 className='mb-4 px-4 text-xl font-bold'>My Channels</h1>

      <div className='border-1 flex flex-1 flex-row overflow-hidden'>
        <ScrollArea className='w-1/3 border-r'>
          <Suspense fallback={<LoadingSkeleton />}>
            <AbstractChannelsList channels={channels} />
          </Suspense>
        </ScrollArea>

        <ScrollArea className='w-2/3 p-6'>
          <ArticlesList isOwner={true} channelAddress={activeChannelAddress} />
        </ScrollArea>
      </div>
    </div>
  )
}
