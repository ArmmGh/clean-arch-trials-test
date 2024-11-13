import getArticlesByChannelAddressController from '@/controllers/articles/get-articles-by-channel-address.controller'
import { Address } from 'viem'
import Article from './article'
import SuggestedChannels from './suggested-channels'

const getArticles = async (channelAddress: Address) => {
  try {
    return getArticlesByChannelAddressController({ channelAddress })
  } catch (error) {
    return []
  }
}

export default async function ChannelPage({ params }: { params: Promise<{ address: Address }> }) {
  const { address: channelAddress } = await params

  const articles = await getArticles(channelAddress)
  // TODO: Make sure that user is authorized to view the channel

  if (!articles.length) {
    return <div>No articles found</div>
  }

  return (
    <div className='grid gap-6 overflow-hidden md:grid-cols-[1fr,345px]'>
      <div className='space-y-[13px] pb-5'>
        {articles.map((article, index) => (
          <Article
            isPreview={true}
            key={index}
            date={article.date}
            description={article.description}
            image={article.image}
            htmlContent={article.htmlContent}
            name={article.name}
            emojis={[
              { emoji: '👍', count: 100 },
              {
                emoji: '🔥',
                count: 5,
              },
              {
                emoji: '👎',
                count: 2,
              },
            ]}
          />
        ))}
      </div>

      <div className=''>
        <SuggestedChannels className='fixed top-[116px] w-[345px]' />
      </div>
    </div>
  )
}
