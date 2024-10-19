'use client'

import { useState } from 'react'
import ChannelChooser from './ChannelChooser'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Channel as ChannelType } from '@/entities/models/channel'
import { useQuery } from '@tanstack/react-query'
import getDraftedArticlesAction from '@/app/actions/getDraftedArticles.action'
import DraftedArticles from './DraftedArticles'
import ArticleCreationStepper from './ArticleCreationStepper'

export default function CreateArticleFlow({ channels }: { channels: ChannelType[] }) {
  const [activeChannelAddress, setActiveChannelAddress] = useState<ChannelType['address']>()
  const [tab, setTab] = useState<'create' | 'drafts'>('create')

  const onTabChange = (value: string) => {
    setTab(value as 'create' | 'drafts')
  }

  const { data: draftedArticles = [], isLoading } = useQuery<any[]>({
    queryKey: ['drafted-articles', { channelAddress: activeChannelAddress }],
    queryFn: () => getDraftedArticlesAction({ channelAddress: activeChannelAddress! }),
    enabled: !!activeChannelAddress,
  })

  return (
    <div className='flex flex-col items-center'>
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
          {/* <CreateArticleForm /> */}
        </TabsContent>
        <TabsContent value='drafts'>
          <DraftedArticles draftedArticles={draftedArticles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
