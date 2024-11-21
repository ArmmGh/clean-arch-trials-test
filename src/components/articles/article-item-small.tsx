import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Article } from '@/entities/models/article'
import { Address } from 'viem'

export default function ArticleItemSmall(props: {
  id: Article['id']
  date: Article['date']
  name: Article['name']
  description: Article['description']
  image: Article['image']
  channelAddress: Address | string
  className?: string
}) {
  const url = `channel/${props.channelAddress}/article/${props.id}`

  return (
    <Link
      className={cn(
        `round flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white`,
        props.className,
      )}
      href={url}
    >
      <div className='relative h-[170px] w-full'>
        <Image src={props.image} fill alt={props.name} style={{ objectFit: 'cover' }} />
      </div>

      <div className='flex flex-col gap-2 px-5 pb-6 pt-5'>
        <p className='text-base font-bold text-black'>{props.description}</p>

        <Separator />

        <div>
          <div className='flex items-center gap-2'>
            <div className='relative h-10 w-10'>
              <Image src={props.image} fill alt={props.name} className='rounded-full' />
            </div>

            <p className='text-sm text-slate-700'>Channel name heree</p>
          </div>

          <div>
            <p className='text-sm text-slate-700'>{props.date}</p>
          </div>
          {/* Actions */}
        </div>
      </div>
    </Link>
  )
}
