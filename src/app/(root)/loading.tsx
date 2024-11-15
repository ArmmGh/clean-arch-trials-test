import ArticleItemSmallSkeleton from '@/components/skeletons/article-item-small-skeleton'

export default function Loading() {
  return (
    <div className='grid grid-cols-3 gap-[30px] py-6'>
      {Array.from({ length: 6 }).map((_, index) => (
        <ArticleItemSmallSkeleton key={index} />
      ))}
    </div>
  )
}
