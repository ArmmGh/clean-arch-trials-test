import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Strike({ className }: { className?: string }) {
  return (
    <div className={cn('relative size-4', className)}>
      <Image src='/assets/strike.png' fill alt='Strike' />
    </div>
  )
}
