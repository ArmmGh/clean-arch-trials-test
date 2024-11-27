import { CardFooter } from '@/components/ui/card'
import Action from './article-action'
import { Bookmark, MessageSquare, Share2 } from 'lucide-react'
import ArticleEmojis from './article-emojis'

export default function ArticlePreviewFooter({ emojis = [] }: { emojis?: { emoji: string; count?: number }[] }) {
  return (
    <CardFooter className='items-center justify-between px-5 pb-6'>
      <ArticleEmojis emojis={emojis} />

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
  )
}
