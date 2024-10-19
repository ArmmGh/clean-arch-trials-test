import Article from './Article'
import { Loader2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getAddress } from 'viem'
import getArticlesByChannelAddressAction from '@/app/actions/getArticlesByChannelAddress.action'
import { useAccount } from 'wagmi'
import NoArticles from '@/app/dashboard/components/NoArticles'

export default function Articles({ channelAddress, channelOwner }: { channelAddress: string; channelOwner: string }) {
  const { address } = useAccount()
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles-by-channel-address', { channelAddress, channelOwner }],
    queryFn: () => getArticlesByChannelAddressAction({ channelAddress: getAddress(channelAddress) }),
    enabled: !!channelAddress && !!channelOwner,
    staleTime: 1000 * 60 * 10, // 10 minutes - keep the data fresh for 10 minutes
    gcTime: 1000 * 60 * 60,
  })

  const isOwner = channelOwner === address

  if (isLoading) {
    return (
      <div className='flex h-full justify-center'>
        <Loader2 className='h-10 w-10 animate-spin' />
      </div>
    )
  }

  if (!articles.length) {
    return <NoArticles isOwner={isOwner} channelAddress={channelAddress} />
  }

  return (
    <div className='grid gap-6'>
      {/* {isOwner && (<Button>Create Article</Button>)} */}
      {articles?.map((article: any) => <Article key={article.date} {...article} />)}
    </div>
  )
}
