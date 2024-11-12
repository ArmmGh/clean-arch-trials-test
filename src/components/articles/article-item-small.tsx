import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export default function ArticleItemSmall(props: {
  date: string
  name: string
  description: string
  image: string
  className?: string
}) {
  return (
    <Link
      className={cn(
        `round flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white`,
        props.className,
      )}
      href='/'
      prefetch={true}
    >
      <div className='relative h-[170px] w-full'>
        <Image src={props.image} fill alt={props.name} style={{ objectFit: 'cover' }} />
      </div>

      <div className='flex flex-col gap-2 px-5 pb-6 pt-5'>
        <div className=''>
          <p className='text-base font-bold text-black'>{props.description}</p>
        </div>

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
