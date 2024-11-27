import OldArticle from '@/components/articles/old-article'
import { Address, isAddress } from 'viem'
import NoArticles from './no-articles'
import getPublicationsByChannelAddressController from '@/controllers/publications/get-publications-by-channel-address.controller'

async function getArticles(channelAddress: Address) {
  return getPublicationsByChannelAddressController({ channelAddress })
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
        <OldArticle key={index} {...article} />
      ))}
    </div>
  )
}
