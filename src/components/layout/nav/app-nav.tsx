import ConnectWallet from '@/components/connect-wallet'
import { ModeToggle } from '@/components/ModeToggle'
import SearchInput from './search-input'
import { cn } from '@/lib/utils'

export default function AppNav(props: { className?: string }) {
  return (
    <nav className={cn('backdrop-blur-md', props.className)}>
      <div className='flex items-start gap-6'>
        <SearchInput clasName='max-w-[780px] pb-4 w-full border-b border-slate-300' />

        <div className='flex flex-1 items-center justify-end gap-1'>
          <ConnectWallet className='min-w-[170px]' />

          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
