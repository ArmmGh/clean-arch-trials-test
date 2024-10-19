import getPublisherAllChannelsAction from '@/app/actions/getPublisherAllChannels.action'
import Main from '@/components/layout/Main'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import CreateArticleFlow from './components/CreateArticleFlow'

export default async function CreateArticle() {
  const publisherAddress = getPublisherAddressFromSession()
  const channels = await getPublisherAllChannelsAction({ publisherAddress })

  return (
    <Main className='w-full'>
      <CreateArticleFlow channels={channels} />
    </Main>
  )
}
