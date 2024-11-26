import ArticlePreview from '@/components/articles/article/article-preview'
import { PresentedPublication } from '@/controllers/articles/get-articles-by-channel-address.controller'
import { PresentedChannelMetadata } from '@/controllers/channels/get-channel-metadata.controller'
import { use } from 'react'
import { Address } from 'viem'

export default function Publications({
  promisedChannelMetadata,
  promisedPublications,
  channelAddress,
}: {
  promisedChannelMetadata: Promise<PresentedChannelMetadata | null>
  promisedPublications: Promise<PresentedPublication[]>
  channelAddress: Address
}) {
  const [channelMetadata, publications] = use(Promise.all([promisedChannelMetadata, promisedPublications]))

  return (
    <div>
      {publications.length ? (
        <div className='space-y-[13px] pb-5'>
          {publications.map((article: any, index: number) => (
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
      ) : (
        <div>No publications found</div>
      )}
    </div>
  )
}
