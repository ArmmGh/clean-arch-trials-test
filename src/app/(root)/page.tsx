import ArticlesList from '@/components/articles/articles-list'
import { isAddress } from 'viem'

export type SearchParams = {
  channel?: string
}

export default async function RootPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams
  const { channel } = searchParams
  const isValidChannel = channel && isAddress(channel)

  if (!isValidChannel) {
    return <p className='text-center text-sm text-muted-foreground'>Choose a channel</p>
  }

  return <ArticlesList channelAddress={channel} />
}
