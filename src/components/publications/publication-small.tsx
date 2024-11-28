import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Article } from '@/entities/models/article'
import { Address } from 'viem'
import { ExternalLink } from 'lucide-react'
import Strike from '@/components/ui/strike'

export default function PublicationSmall(props: {
  date: Article['date']
  name: Article['name']
  description: Article['description']
  image: Article['image']
  channelAddress: Address | string
  className?: string
  channelImage: string
  channelName: string
  href: string
  index: number
}) {
  const url = `channel/${props.channelAddress}/publication/${props.index}`
  const channelUrl = `channel/${props.channelAddress}`

  return (
    <div
      className={cn(
        `round flex flex-col space-y-2 overflow-hidden rounded-xl border border-slate-300 bg-white`,
        props.className,
      )}
    >
      <Link href={url}>
        <div className='relative h-[170px] w-full'>
          <Image src={props.image} fill alt={props.name} style={{ objectFit: 'cover' }} />
        </div>
        <div className='flex flex-col gap-2 p-5 pb-0'>
          <p className='text-base font-bold text-black'>{props.description}</p>
        </div>
      </Link>

      <div className='px-5'>
        <Separator className='bg-slate-300' />
      </div>

      <div className='flex items-center justify-between p-5 pt-0'>
        <div className='flex items-center gap-2'>
          <Link href={channelUrl} className='flex items-center gap-2'>
            <div className='relative h-10 w-10'>
              {props.channelImage && props.channelName && (
                <Image src={props.channelImage} fill alt={props.channelName} className='rounded-full' />
              )}
            </div>

            <p className='text-sm text-slate-700'>{props.channelName}</p>
          </Link>

          <p className='text-xs font-medium text-slate-500'>
            <span>-</span> {props.date}
          </p>
        </div>

        <SmallPublicationActions href={props.href} />
      </div>
    </div>
  )
}

function SmallPublicationActions({ href }: { href: string }) {
  return (
    <div className='flex gap-1'>
      <Link href={href} target='_blank' prefetch={false}>
        <ExternalLink size={16} className='text-teal-700' strokeWidth={1.5} />
      </Link>

      <Strike />
    </div>
  )
}
