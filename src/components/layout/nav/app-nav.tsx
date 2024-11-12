import ConnectWallet from '@/components/connect-wallet'
import { ModeToggle } from '@/components/ModeToggle'
import SearchInput from './search-input'

export default function AppNav() {
  return (
    <nav className='flex-1'>
      <div className='flex items-center gap-6'>
        <SearchInput />

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
