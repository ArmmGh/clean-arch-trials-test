import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import ArticleHtmlDialog from './ArticleHtmlDialog'
import type { Article } from '@/entities/models/article'

export default function Article({
  name,
  description,
  date,
  image,
  htmlContent,
  ...props
}: Omit<Article, 'externalUrl'>) {
  return (
    <div className='overflow-hidden rounded-lg border'>
      <div className='relative h-48 w-full'>
        <Image src={image} alt={name} fill className='h-48 w-full object-cover' />
      </div>
      <div className='p-6'>
        <h3 className='mb-2 text-xl font-semibold'>{name || 'No Title'}</h3>
        <p className='mb-4 text-muted-foreground'>{description || 'No Description'}</p>
        <div className='mb-4 flex items-center'>
          <Avatar className='mr-3 h-10 w-10'>
            {/* <AvatarImage src='/' alt={name} /> */}
            <AvatarFallback>
              {(name || 'N/A')
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            {/* <p className='text-sm font-medium'>{article.author.name}</p> */}
            {/* June 2, 2023 */}
            <p className='text-xs text-muted-foreground'>{date}</p>
          </div>
          <div className='ml-auto flex items-center text-muted-foreground'>
            {/* <Clock className='mr-1 h-4 w-4' /> */}
            {/* <span className='text-xs'>{article.readTime}</span> */}
          </div>
        </div>
        <div className='mb-4 flex flex-wrap gap-2'>
          {Object.keys(props).map((key) => (
            <Badge key={key} variant='secondary'>
              <Tag className='mr-1 h-3 w-3' />
              {key}
            </Badge>
          ))}
        </div>

        <ArticleHtmlDialog htmlContent={htmlContent} name={name} description={description} />
      </div>
    </div>
  )
}
