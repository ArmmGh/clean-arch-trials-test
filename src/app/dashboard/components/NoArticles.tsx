import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NoArticles() {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-2xl'>You don&apos;t have any articles yet.</h1>

      <Button asChild>
        <Link href='/dashboard/create-article'>Create Your first Article!</Link>
      </Button>
    </div>
  )
}
