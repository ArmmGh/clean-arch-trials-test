import ArticlesList from '@/components/articles/articles-list'
import { isAddress } from 'viem'

type SearchParams = {
  channel?: string
}

export default function RootPage({ searchParams }: { searchParams: SearchParams }) {
  const { channel } = searchParams
  const isValidChannel = channel && isAddress(channel)

  if (!isValidChannel) {
    return <p className='text-center text-sm text-muted-foreground'>Choose a channel</p>
  }

  return <ArticlesList channelAddress={channel} />
}
