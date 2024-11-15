import ArticlePreviewSkeleton from '@/components/skeletons/article-preview-skeleton'

export default function Loading() {
  return (
    <div className='grid gap-6 overflow-hidden md:grid-cols-[1fr,345px]'>
    <div className='space-y-[13px] pb-5'>
      {Array.from({ length: 3 }).map((_, index) => (
        <ArticlePreviewSkeleton key={index} />
      ))}
    </div>
    <div></div>
    </div>
  )
}
