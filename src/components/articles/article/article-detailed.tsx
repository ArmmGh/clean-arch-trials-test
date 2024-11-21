import { Card, CardFooter } from '@/components/ui/card'
import { type Article } from '@/entities/models/article'
import React from 'react'
import ArticleEditor from '../article-editor'
import ArticleHeader from './article-header'
import ArticleContent from './article-content'
import ArticleEmojis from './article-emojis'

export default function ArticleDetailed({
  htmlContent,
  id,
  emojis,
  name,
  image,
  description,
  date,
  channelMetadata,
  ...props
}: {
  id: Article['id']
  htmlContent: Article['htmlContent']
  name: Article['name']
  image: Article['image']
  date: Article['date']
  description: Article['description']
  emojis?: { emoji: string; count: number }[]
  channelMetadata: { avatarUrl: string; followers: string; name: string } | null
}) {
  return (
    <Card className='space-y-4 rounded-xl border border-slate-200 bg-white px-10 py-6 shadow-none'>
      <ArticleHeader channelMetadata={channelMetadata} date={date} />

      <ArticleContent description={description} image={image} name={name}>
        <ArticleEditor
          containerClassName={'overflow-hidden mt-4 min-h-content'}
          editorContentClassName='p-0'
          className={'min-h-min overflow-y-scroll border-none'}
          editable={false}
          autofocus={false}
          value={htmlContent}
        />
      </ArticleContent>

      <CardFooter className='m-0 items-center justify-between p-0'>
        <ArticleEmojis emojis={emojis} />
        {/* <div className='flex items-center gap-2'>
          {emojis?.map(({ emoji, count = 0 }) => (
            <div
              key={emoji}
              className='flex items-center gap-1 rounded-[100px] bg-[#F4F4FA] px-[7px] py-1 text-[11px] text-black'
            >
              <span className='text-[14px]'>{emoji}</span> {count}
            </div>
          ))}
        </div> */}
      </CardFooter>
    </Card>
  )
}
