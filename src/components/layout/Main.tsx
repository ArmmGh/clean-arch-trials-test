import { cn } from '@/lib/utils'

export default function Main({ className, children }: { className?: string; children: React.ReactNode }) {
  return <main className={cn('mx-auto max-w-screen-xl px-4', className)}>{children}</main>
}
