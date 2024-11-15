import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export default function SuggestedChannels(props: { className?: string }) {
  return (
    <div className={cn('hidden rounded-xl border bg-white p-4 md:block', props.className)}>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Suggested Channels</h2>
      </div>
      <div className='h-[400px]'>{/* Placeholder for suggested channels */}</div>
      <Button variant='ghost' className='w-full gap-2'>
        Show More
        <ChevronDown className='h-4 w-4' />
      </Button>
    </div>
  )
}
