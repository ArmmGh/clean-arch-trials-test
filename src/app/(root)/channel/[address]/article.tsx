import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import { Bookmark, MessageSquare, MoreVertical, Share2 } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'

export default function Article({
  image,
  date,
  name,
  description,
  htmlContent,
  isPreview,
  emojis = [],
}: {
  image: Article['image']
  date: Article['date']
  name: Article['name']
  description: Article['description']
  htmlContent: Article['htmlContent']
  isPreview?: boolean
  emojis: { emoji: string; count: number }[]
}) {
  return (
    <Card className='space-y-4 rounded-xl border border-slate-200 bg-white px-5 py-6 shadow-none'>
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

      <CardContent className='px-0 py-0'>
        <div className='relative mb-4 aspect-[2/1] overflow-hidden rounded-[15px] lg:aspect-[2/1]'>
          <Image src={image} alt={name} fill className='object-cover' />
        </div>
        <h2 className='mb-2 text-xl font-bold'>{name}</h2>
        <p className='text-muted-foreground'>{description}</p>

        {/* {isPreview && (
          // TODO: put editor preview
        )} */}
      </CardContent>

      <CardFooter className='items-center justify-between p-0'>
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
          {/* <Button variant='ghost' size='sm' className='gap-2'> */}
          <Action>
            <MessageSquare size={20} strokeWidth={1.3} />
            {0} comments
          </Action>
          {/* </Button> */}
          {/* <Button variant='ghost' size='sm' className='gap-2'> */}
          <Action>
            <Share2 size={20} strokeWidth={1.3} />
            Share
          </Action>
          {/* </Button> */}

          <Action>
            <Bookmark size={16} strokeWidth={1.3} />
          </Action>
        </div>
      </CardFooter>

      {/* TODO: implement 
      <CardFooter className='flex items-center justify-between px-0'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <Fire className='h-4 w-4' />
            {engagement.reactions}
          </Button>
          <Button variant='ghost' size='sm' className='gap-2'>
            <Share2 className='h-4 w-4' />
            {engagement.shares}
          </Button>
          <Button variant='ghost' size='sm' className='gap-2'>
            <MessageCircle className='h-4 w-4' />
            {engagement.comments} comments
          </Button>
        </div>
        <Button variant='outline' size='sm'>
          Share
        </Button>
      </CardFooter> */}
    </Card>
  )
}

function Action({ children }: { children: ReactNode }) {
  return <div className='flex cursor-not-allowed items-center gap-1 text-xs font-medium text-slate-700'>{children}</div>
}
