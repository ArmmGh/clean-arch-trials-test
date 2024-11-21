import getArticlesByChannelAddressController from '@/controllers/articles/get-articles-by-channel-address.controller'
import { Address } from 'viem'
import SuggestedChannels from './suggested-channels'
import getChannelMetadataController from '@/controllers/channels/get-channel-metadata.controller'
import ArticlePreview from '@/components/articles/article/article-preview'

const getArticles = async (channelAddress: Address) => {
  try {
    return getArticlesByChannelAddressController({ channelAddress })
  } catch (error) {
    return []
  }
}

const getChannelMetadata = async (channelAddress: Address) => {
  try {
    return getChannelMetadataController({ channelAddress })
  } catch (error) {
    return null
  }
}

export default async function ChannelPage({ params }: { params: Promise<{ address: Address }> }) {
  const { address: channelAddress } = await params
  const [channelMetadata, articles] = await Promise.all([
    getChannelMetadata(channelAddress),
    getArticles(channelAddress),
  ])
  // TODO: Make sure that user is authorized to view the channel

  if (!articles.length) {
    return <div>No articles found</div>
  }

  return (
    <div className='grid gap-6 overflow-hidden md:grid-cols-[1fr,345px]'>
      <div className='space-y-[13px] pb-5'>
        {articles.map((article, index) => (
          <ArticlePreview
            id={article.id}
            channelAddress={channelAddress}
            key={index}
            date={article.date}
            description={article.description}
            image={article.image}
            name={article.name}
            emojis={article.emojis}
            channelMetadata={channelMetadata}
          />
        ))}
      </div>

      <div className=''>
        <SuggestedChannels className='fixed top-[116px] w-[345px]' />
      </div>
    </div>
  )
}
