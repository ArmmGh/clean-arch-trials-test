import { Card } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import Link from 'next/link'
import { Address } from 'viem'
import ArticleHeader from './article-header'
import ArticleContent from './article-content'
import ArticlePreviewFooter from './article-preview-footer'

export default function ArticlePreview({
  id,
  image,
  date,
  name,
  description,
  emojis = [],
  channelAddress,
  channelMetadata,
}: {
  image: Article['image']
  date: Article['date']
  name: Article['name']
  description: Article['description']
  id: Article['id']
  isPreview?: boolean
  emojis: Article['emojis']
  channelAddress: Address
  channelMetadata: { avatarUrl: string; followers: string; name: string } | null
}) {
  const url = `/channel/${channelAddress}/article/${id}`

  return (
    <Card className='rounded-xl border border-slate-200 bg-white shadow-none'>
      <Link href={url} className='flex flex-col space-y-4 px-5 py-6'>
        <ArticleHeader channelMetadata={channelMetadata} date={date} />

        <ArticleContent description={description} image={image} name={name} />
      </Link>

      <ArticlePreviewFooter emojis={emojis} />
    </Card>
  )
}
