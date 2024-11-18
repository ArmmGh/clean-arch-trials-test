import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-[45px] w-[165px]', className)}>
      <Image src={'/logo/logo.svg'} fill alt='Logo' />
    </div>
  )
}
