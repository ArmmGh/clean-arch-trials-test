import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NoArticles({ isOwner = false, channelAddress }: { isOwner: boolean; channelAddress: string }) {
  if (isOwner) {
    return (
      <div className='flex flex-col gap-4'>
        <p className='text-center'>You don&apos;t have any articles yet.</p>

        <Button asChild>
          <Link href={`/dashboard/create-article?channel=${channelAddress}`}>Create One!</Link>
        </Button>
      </div>
    )
  }

  return <p className='text-center text-sm text-muted-foreground'>No articles found</p>
}
