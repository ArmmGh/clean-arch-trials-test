import { Bookmark, MessageSquare, Share2 } from 'lucide-react'
import { ReactNode } from 'react'
import { Input } from '@/components/ui/input'

function Action({ children }: { children: ReactNode }) {
  return <div className='flex cursor-not-allowed items-center gap-1 text-xs font-medium text-slate-700'>{children}</div>
}

export default function ArticleInteractions() {
  return (
    <div className='flex flex-col px-6'>
      <div className='flex items-center justify-between'>
        <div>
          <Action>
            <MessageSquare size={20} strokeWidth={1.3} />
            {0} comments
          </Action>
        </div>

        <div className='flex items-center gap-2'>
          <Action>
            <Share2 size={20} strokeWidth={1.3} />
            Share
          </Action>

          <Action>
            <Bookmark size={16} strokeWidth={1.3} />
          </Action>
        </div>
      </div>

      <Input
        className='my-6 h-[50px] rounded-md border-slate-300 bg-white placeholder:text-slate-400'
        placeholder='Add Comment'
        disabled
      />
    </div>
  )
}
