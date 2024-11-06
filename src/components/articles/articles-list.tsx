import Article from '@/components/articles/Article'
import { Address, isAddress } from 'viem'
import NoArticles from './no-articles'
import getArticlesByChannelAddressController from '@/controllers/articles/get-articles-by-channel-address.controller'

async function getArticles(channelAddress: Address) {
  return getArticlesByChannelAddressController({ channelAddress })
}

export default async function ArticlesList({
  channelAddress,
  isOwner = false,
}: {
  isOwner?: boolean
  channelAddress?: string
}) {
  const isValidChannel = channelAddress && isAddress(channelAddress)

  if (!isValidChannel) return null

  const articles = await getArticles(channelAddress)

  // TODO: fix isOwner
  if (!articles.length) return <NoArticles isOwner={isOwner} channelAddress={channelAddress} />

  return (
    <div className='grid gap-6'>
      {articles.map((article, index) => (
        <Article key={index} {...article} />
      ))}
    </div>
  )
}
