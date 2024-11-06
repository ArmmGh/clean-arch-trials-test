import Main from '@/components/layout/Main'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ArticleCreationStepper from './components/article-creation-stepper'
import ChannelChooser from './components/channel-chooser'
import DraftedArticles from './components/DraftedArticles'

export const maxDuration = 30

export default async function CreateArticle(props: { searchParams: Promise<{ channel?: string }> }) {
  const searchParams = await props.searchParams
  const { channel: activeChannelAddress } = searchParams

  // if (channels.length === 0) {
  //   return (
  //     <div className='py-4'>
  //       <NoChannels />
  //     </div>
  //   )
  // }

  return (
    <Main className='w-full'>
      <div className='flex flex-col items-center py-4'>
        <ChannelChooser activeChannelAddress={activeChannelAddress} />

        <Tabs defaultValue='create' className='w-[650px]'>
          <TabsList className='grid w-full grid-cols-2 rounded-none'>
            <TabsTrigger value='create'>Create Article</TabsTrigger>
            <TabsTrigger value='drafts'>Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value='create' className='mt-0'>
            <ArticleCreationStepper activeChannelAddress={activeChannelAddress} />
          </TabsContent>
          <TabsContent value='drafts' className='mt-0'>
            <DraftedArticles />
          </TabsContent>
        </Tabs>
      </div>
    </Main>
  )
}
