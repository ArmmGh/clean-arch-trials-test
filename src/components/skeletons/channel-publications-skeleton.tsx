import ArticlePreviewSkeleton from './article-preview-skeleton'

export default function ChannelPublicationsSkeleton() {
  return (
    <div className='space-y-[13px] pb-5'>
      {Array.from({ length: 3 }).map((_, index) => (
        <ArticlePreviewSkeleton key={index} />
      ))}
    </div>
  )
}
