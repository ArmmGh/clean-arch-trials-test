// TODO: rename publication to article
import { Card } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import Link from 'next/link'
import { Address } from 'viem'
import ArticleHeader from '../articles/article/article-header'
import ArticleContent from '../articles/article/article-content'
import ArticlePreviewFooter from '../articles/article/article-preview-footer'
import { type PublicationPreview } from '@/entities/models/publication'

export default function PublicationPreview({
  image,
  date,
  name,
  description,
  channelAddress,
  channelMetadata,
  index,
}: {
  image: Article['image']
  date: Article['date']
  name: Article['name']
  index: PublicationPreview['index']
  description: Article['description']
  channelAddress: Address
  channelMetadata: { avatarUrl: string; followers: string; name: string } | null
}) {
  const url = `/channel/${channelAddress}/publication/${index}`

  return (
    <Card className='rounded-xl border border-slate-200 bg-white shadow-none'>
      <Link href={url} className='flex flex-col space-y-4 px-5 py-6'>
        <ArticleHeader channelMetadata={channelMetadata} date={date} />

        <ArticleContent description={description} image={image} name={name} />
      </Link>

      <ArticlePreviewFooter />
    </Card>
  )
}
