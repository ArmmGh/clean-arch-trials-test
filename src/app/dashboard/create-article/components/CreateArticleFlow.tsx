'use client'

import WithAuth from '@/components/HOC/withAuth'
import NoChannels from '@/components/NoChannels'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Channel as ChannelType } from '@/entities/models/channel'
import { useState } from 'react'
import ArticleCreationStepper from './ArticleCreationStepper'
import ChannelChooser from './ChannelChooser'
import DraftedArticles from './DraftedArticles'

function CreateArticleFlow({ channels }: { channels: ChannelType[] }) {
  const [activeChannelAddress, setActiveChannelAddress] = useState<ChannelType['address']>()
  const [tab, setTab] = useState<'create' | 'drafts'>('create')

  const onTabChange = (value: string) => {
    setTab(value as 'create' | 'drafts')
  }

  if (channels.length === 0) return <NoChannels />

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
