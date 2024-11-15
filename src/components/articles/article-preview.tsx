import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import { Bookmark, MessageSquare, MoreVertical, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Address } from 'viem'

export default function ArticlePreview({
  id,
  image,
  date,
  name,
  description,
  emojis = [],
  channelAddress,
}: {
  image: Article['image']
  date: Article['date']
  name: Article['name']
  description: Article['description']
  id: Article['id']
  isPreview?: boolean
  emojis: Article['emojis']
  channelAddress: Address
}) {
  const url = `/channel/${channelAddress}/article/${id}`

  return (
    <Card className='rounded-xl border border-slate-200 bg-white shadow-none'>
      <Link href={url} className='flex flex-col space-y-4 px-5 py-6'>
        <CardHeader className='flex-row items-center justify-between space-y-0 p-0'>
          <div className='flex items-center gap-3'>
            <Image src={'/placeholder.svg'} alt={name} width={40} height={40} className='rounded-full' />
            <div>
              <h3 className='font-semibold'>{name}</h3>
              {/* TODO: <p className='text-sm text-muted-foreground'>{subscribers}</p> */}
            </div>
          </div>
          <div className='flex items-center gap-4'>
            {/* TODO: date in another format */}
            <span className='text-sm text-muted-foreground'>{date}</span>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreVertical className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>

        <CardContent className='p-0'>
          <div className='relative mb-4 aspect-[2/1] overflow-hidden rounded-[15px] lg:aspect-[2/1]'>
            <Image src={image} alt={name} fill className='object-cover' />
          </div>
          <h2 className='mb-2 text-xl font-bold'>{name}</h2>
          <p className='text-muted-foreground'>{description}</p>
        </CardContent>
      </Link>

      <CardFooter className='items-center justify-between px-5 pb-6'>
        <div className='flex items-center gap-2'>
          {emojis.map(({ emoji, count = 0 }) => (
            <div
              key={emoji}
              className='flex items-center gap-1 rounded-[100px] bg-[#F4F4FA] px-[7px] py-1 text-[11px] text-black'
            >
              <span className='text-[14px]'>{emoji}</span> {count}
            </div>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          <Action>
            <MessageSquare size={20} strokeWidth={1.3} />
            {0} comments
          </Action>

          <Action>
            <Share2 size={20} strokeWidth={1.3} />
            Share
          </Action>

          <Action>
            <Bookmark size={16} strokeWidth={1.3} />
          </Action>
        </div>
      </CardFooter>
    </Card>
  )
}

function Action({ children }: { children: ReactNode }) {
  return <div className='flex cursor-not-allowed items-center gap-1 text-xs font-medium text-slate-700'>{children}</div>
}
