import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import { Channel } from '@/entities/models/channel'
import { Bookmark, MessageSquare, MoreVertical, Share2 } from 'lucide-react'
import Image from 'next/image'
import React, { ReactNode, Suspense } from 'react'
import ArticleEditor from './article-editor'

export default function Article({
  htmlContent,
  id,
  emojis,
  name,
  image,
  description,
  date,
  ...props
}: {
  id: Article['id']
  htmlContent: Article['htmlContent']
  name: Article['name']
  image: Article['image']
  date: Article['date']
  description: Article['description']
  emojis?: { emoji: string; count: number }[]
}) {
  return (
    <Card className='space-y-4 rounded-xl border border-slate-200 bg-white px-10 py-6 shadow-none'>
      <CardHeader className='flex-row items-center justify-between space-y-0 p-0'>
        <div className='flex items-center gap-3'>
          <Image src={'/placeholder.svg'} alt={name} width={40} height={40} className='rounded-full' />
          <div>
            <h3 className='font-semibold'>{name}</h3>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-muted-foreground'>{date}</span>
          <Button variant='ghost' size='icon' className='h-8 w-8'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='px-0 py-0'>
        <div className='relative mb-4 aspect-[2/1] overflow-hidden rounded-[15px] lg:aspect-[3/1]'>
          <Image src={image} alt={name} fill className='object-cover' />
        </div>
        <h2 className='mb-2 text-xl font-bold'>{name}</h2>
        <p className='text-muted-foreground'>{description}</p>

        <ArticleEditor
          containerClassName={'overflow-hidden mt-4 min-h-content'}
          editorContentClassName='p-0'
          className={'min-h-min overflow-y-scroll border-none'}
          editable={false}
          autofocus={false}
          value={htmlContent}
        />
      </CardContent>

      <CardFooter className='m-0 items-center justify-between p-0'>
        <div className='flex items-center gap-2'>
          {emojis?.map(({ emoji, count = 0 }) => (
            <div
              key={emoji}
              className='flex items-center gap-1 rounded-[100px] bg-[#F4F4FA] px-[7px] py-1 text-[11px] text-black'
            >
              <span className='text-[14px]'>{emoji}</span> {count}
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

function Action({ children }: { children: ReactNode }) {
  return <div className='flex cursor-not-allowed items-center gap-1 text-xs font-medium text-slate-700'>{children}</div>
}
