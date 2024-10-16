import Article from './Article'
import { getAddress } from 'viem'
import getArticlesByChannelIdAction from '@/app/actions/getArticlesByChannelId.action'
import type { Channel } from '@/entities/models/channel'
import { Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

export default function Articles({ activeChannel }: { activeChannel: any }) {
  const activeAddress = activeChannel?.address
  const activeOwner = activeChannel?.owner
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles-by-channel-id', { address: activeAddress, owner: activeOwner }],
    queryFn: () =>
      getArticlesByChannelIdAction({ channelId: getAddress(activeChannel.address), owner: activeChannel.owner }),
    enabled: !!activeChannel && !!activeAddress && !!activeOwner,
    staleTime: 1000 * 60 * 10, // 10 minutes - keep the data fresh for 10 minutes
    gcTime: 1000 * 60 * 60,
  })

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    )
  }

  return (
    <div className='grid gap-6'>{articles?.map((article: any) => <Article key={article.id} article={article} />)}</div>
  )
}
