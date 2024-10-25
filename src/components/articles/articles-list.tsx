import Article from '@/components/articles/Article'
import { getAddress, isAddress } from 'viem'
import NoArticles from './no-articles'
import getArticlesByChannelAddressAction from '@/app/actions/getArticlesByChannelAddress.action'

export default async function ArticlesList({
  channelAddress,
  isOwner = false,
}: {
  isOwner?: boolean
  channelAddress?: string
}) {
  const isValidChannel = channelAddress && isAddress(channelAddress)

  if (!isValidChannel) return null

  const articles = await getArticlesByChannelAddressAction({ channelAddress: getAddress(channelAddress) })

  // TODO: fix isOwner
  if (!articles.length) return <NoArticles isOwner={isOwner} channelAddress={channelAddress} />

  return (
    <div className='grid gap-6'>
      {articles.map((article: any) => (
        <Article key={article.date} {...article} />
      ))}
    </div>
  )
}
