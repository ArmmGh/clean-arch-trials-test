import getArticleController from '@/controllers/articles/get-article.controller'
import { Address } from 'viem'
import { Separator } from '@/components/ui/separator'
import ArticleInteractions from '@/components/articles/article/article-interactions'
import getChannelMetadataController from '@/controllers/channels/get-channel-metadata.controller'
import ArticleDetailed from '@/components/articles/article/article-detailed'

const getArticle = async (channelAddress: Address, articleId: string) => {
  try {
    return getArticleController({ channelAddress, articleId })
  } catch (error) {
    console.log(error)

    return null
  }
}

const getChannelMetadata = async (channelAddress: Address) => {
  try {
    return getChannelMetadataController({ channelAddress })
  } catch (error) {
    return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ id: Address; address: Address }> }) {
  const { id: articleId, address: channelAddress } = await params

  const [article, channelMetadata] = await Promise.all([
    getArticle(channelAddress, articleId),
    getChannelMetadata(channelAddress),
  ])

  if (!article) return <div>Article not found</div>

  // Get article (with authorization if needed)

  return (
    <div className='space-y-4 py-5'>
      <ArticleDetailed {...article} channelMetadata={channelMetadata} />
      <Separator className='bg-slate-300' />
      <ArticleInteractions />
    </div>
  )
}
