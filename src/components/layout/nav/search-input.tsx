'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

export default function SearchInput({ clasName }: { clasName?: string }) {
  const search = () => {
    console.log('search')
  }

  return (
    <div
      className={cn('flex items-center gap-3 rounded-[50px] border border-slate-300 bg-white px-4 py-[10px]', clasName)}
    >
      <Input
        type='text'
        placeholder='Search...'
        className='h-5 border-0 bg-white p-0 px-0.5 text-sm text-gray-900 ring-0 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
      />

      <div className='flex items-center gap-2'>
        <Select>
          <SelectTrigger className='text-slate-90 h-9 flex-1 border-none px-4 font-medium outline-offset-1 ring-offset-1 transition-colors hover:bg-slate-100'>
            <SelectValue defaultValue='articles' placeholder='Articles' />
          </SelectTrigger>
          <SelectContent className=''>
            <SelectItem value='articles'>Articles</SelectItem>
            <SelectItem value='channels'>Channels</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={search} size='icon' variant='default' className='rounded-full'>
          <Search strokeWidth={1} />
        </Button>
      </div>
    </div>
  )
}
