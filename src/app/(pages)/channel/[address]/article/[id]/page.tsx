import getArticleController from '@/controllers/articles/get-article.controller'
import { Address } from 'viem'
import Article from '@/components/articles/article'
import { Separator } from '@/components/ui/separator'
import ArticleInteractions from '@/components/articles/article-interactions'

const getArticle = async (channelAddress: Address, articleId: string) => {
  try {
    return getArticleController({ channelAddress, articleId })
  } catch (error) {
    console.log(error)

    return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ id: Address; address: Address }> }) {
  const { id: articleId, address: channelAddress } = await params
  const article = await getArticle(channelAddress, articleId)

  if (!article) return <div>Article not found</div>

  // Get article (with authorization if needed)

  return (
    <div className='space-y-4 py-5'>
      <Article {...article} />
      <Separator className='bg-slate-300' />
      <ArticleInteractions />
    </div>
  )
}
