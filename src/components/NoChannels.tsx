import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NoChannels() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='text-2xl'>You don&apos;t have any channels yet!</h1>
      <h2 className='text-xl'>Create one and become a Publisher</h2>

      <Button asChild className='mt-4'>
        <Link href='/dashboard/create-channel'>Become a Publisher!</Link>
      </Button>
    </div>
  )
}