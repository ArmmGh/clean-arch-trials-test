import getArticlesByChannelAddressAction from '@/app/actions/getArticlesByChannelAddress.action'
import NoArticles from '@/app/dashboard/components/NoArticles'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { getAddress } from 'viem'
import { useAccount } from 'wagmi'
import Article from './Article'

export default function Articles({ channelAddress, channelOwner }: { channelAddress: string; channelOwner: string }) {
  const { address } = useAccount()
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['articles-by-channel-address', { channelAddress, channelOwner }],
    queryFn: () => getArticlesByChannelAddressAction({ channelAddress: getAddress(channelAddress) }),
    enabled: !!channelAddress && !!channelOwner,
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
    <div className='grid gap-6'>{articles?.map((article: any) => <Article key={article.date} {...article} />)}</div>
  )
}
