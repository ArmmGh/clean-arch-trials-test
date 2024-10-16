import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Article({ article }: { article: any }) {
  return (
    <div key={article.id} className='overflow-hidden rounded-lg border'>
      <img src={article.image} alt={article.title} className='h-48 w-full object-cover' />
      <div className='p-6'>
        <h3 className='mb-2 text-xl font-semibold'>{article.title}</h3>
        <p className='mb-4 text-muted-foreground'>{article.excerpt}</p>
        <div className='mb-4 flex items-center'>
          <Avatar className='mr-3 h-10 w-10'>
            <AvatarImage src={article.author.avatar} alt={article.author.name} />
            <AvatarFallback>
              {article.author.name
                .split(' ')
                .map((n: string[]) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{article.author.name}</p>
            <p className='text-xs text-muted-foreground'>{article.date}</p>
          </div>
          <div className='ml-auto flex items-center text-muted-foreground'>
            <Clock className='mr-1 h-4 w-4' />
            <span className='text-xs'>{article.readTime}</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {article.tags.map((tag: string) => (
            <Badge key={tag} variant='secondary'>
              <Tag className='mr-1 h-3 w-3' />
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
