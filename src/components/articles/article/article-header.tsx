import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import { MoreVertical } from 'lucide-react'
import Image from 'next/image'

export default function ArticleHeader({
  channelMetadata,
  date,
}: {
  date: string
  channelMetadata: { avatarUrl: string; followers: string; name: string } | null
}) {
  return (
    <CardHeader className='flex-row items-center justify-between space-y-0 p-0'>
      <div className='flex items-center gap-2'>
        <div className='relative h-10 w-10 overflow-hidden rounded-full'>
          <Image src={channelMetadata?.avatarUrl || '/placeholder.svg'} alt={channelMetadata?.name || 'Avatar'} fill />
        </div>
        <div className='flex flex-col text-slate-700'>
          <h3 className='text-sm font-bold'>{channelMetadata?.name}</h3>
          <p className='text-xs font-medium'>{channelMetadata?.followers} Subscribers</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        {/* TODO: date in another format */}
        <span className='text-xs font-medium text-slate-700'>Posted {date}</span>

        <Button variant='ghost' size='icon' className='size-5 h-8 w-8'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </div>
    </CardHeader>
  )
}
