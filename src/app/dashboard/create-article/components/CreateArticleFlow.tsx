'use client'

import WithAuth from '@/components/HOC/withAuth'
import NoChannels from '@/components/NoChannels'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Channel as ChannelType } from '@/entities/models/channel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import ArticleCreationStepper from './ArticleCreationStepper'
import ChannelChooser from './ChannelChooser'
import DraftedArticles from './DraftedArticles'

function CreateArticleFlow({ channels }: { channels: ChannelType[] }) {
  const { address } = useAccount()
  const [activeChannelAddress, setActiveChannelAddress] = useState<ChannelType['address']>()
  const [tab, setTab] = useState<'create' | 'drafts'>('create')
  const router = useRouter()

  const onTabChange = (value: string) => {
    setTab(value as 'create' | 'drafts')
  }

  useEffect(() => {
    if (!channels.length) return

    const onBeforeUnload = () => {
      return
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [])

  useEffect(() => {
    router.refresh()
  }, [address])

  if (channels.length === 0)
    return (
      <div className='py-4'>
        <NoChannels />
      </div>
    )

  return (
    <div className='flex flex-col items-center py-4'>
      <ChannelChooser
        channels={channels}
        activeChannelAddress={activeChannelAddress}
        handleChannelClick={setActiveChannelAddress}
      />

      <Tabs value={tab} onValueChange={onTabChange} className='w-[450px]'>
        <TabsList className='grid w-full grid-cols-2 rounded-none'>
          <TabsTrigger value='create'>Create Article</TabsTrigger>
          <TabsTrigger value='drafts'>Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value='create' className='mt-0'>
          <ArticleCreationStepper setTab={setTab} activeChannelAddress={activeChannelAddress} />
        </TabsContent>
        <TabsContent value='drafts' className='mt-0'>
          <DraftedArticles />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WithAuth(CreateArticleFlow)
