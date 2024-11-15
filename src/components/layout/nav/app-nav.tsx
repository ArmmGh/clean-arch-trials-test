import ConnectWallet from '@/components/connect-wallet'
import { ModeToggle } from '@/components/ModeToggle'
import SearchInput from './search-input'
import { cn } from '@/lib/utils'

export default function AppNav(props: { className?: string }) {
  return (
    <nav className={cn('backdrop-blur-md', props.className)}>
      <div className='flex items-start gap-6'>
        <div className='flex-1 border-b border-slate-300 pb-4'>
          <SearchInput />
        </div>

        <div className='flex items-center gap-1'>
          <div className='min-w-[171px]'>
            <ConnectWallet />
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

// sticky top-0 backdrop-blur-sm
// export default function Nav() {
//   return (
//     <nav className='z-10'>
//       <Main className='flex items-center justify-between px-4 py-4'>
//         <div className='flex items-center gap-6'>
//           <Link className='cursor-pointer text-xl font-semibold' href={'/'}>
//             Media Platform
//           </Link>

//           <Menu />
//         </div>

//         <div className='flex gap-2'>
//           <ConnectWallet />

//           <ModeToggle />
//         </div>
//       </Main>
//     </nav>
//   )
// }
