import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { format, secondsToMilliseconds } from 'date-fns'
import ArticleHtmlDialog from './ArticleHtmlDialog'

type DefaultAttributes = {
  name: string
  description: string
  externalUrl: string
  image: string
  html: string
  htmlContent?: string
  date: string
} & {
  [key: string]: any
}

const humanizeTimestamp = (timestamp: string) => {
  const date = new Date(secondsToMilliseconds(Number(timestamp)))
  const d = new Date(date)
  return format(d, 'MMMM d, yyyy')
}

export default function Article({
  name,
  description,
  date,
  image,
  externalUrl,
  htmlContent,
  html,
  ...props
}: DefaultAttributes) {
  // TODO: use placeholder image till not generaet iamge based on html content
  const tempImage = '/placeholder.svg'

  return (
    <div className='overflow-hidden rounded-lg border'>
      {/* <iframe src={html} className='h-48 w-full' /> */}

      <div className='relative h-48 w-full'>
        <Image
          src={tempImage}
          fill={true}
          // width={200}
          // height={200}
          // placeholder='data:image/placeholder.svg'
          // placeholder='blur'
          alt={name}
          className='h-48 w-full object-cover'
        />
      </div>
      <div className='p-6'>
        <h3 className='mb-2 text-xl font-semibold'>{name}</h3>
        <p className='mb-4 text-muted-foreground'>{description}</p>
        <div className='mb-4 flex items-center'>
          <Avatar className='mr-3 h-10 w-10'>
            {/* <AvatarImage src='/' alt={name} /> */}
            <AvatarFallback>
              {name
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            {/* <p className='text-sm font-medium'>{article.author.name}</p> */}
            {/* June 2, 2023 */}
            <p className='text-xs text-muted-foreground'>{humanizeTimestamp(date)}</p>
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

        <ArticleHtmlDialog html={html} htmlContent={htmlContent} name={name} description={description} />
      </div>
    </div>
  )
}
