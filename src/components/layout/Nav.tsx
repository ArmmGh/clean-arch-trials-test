import Link from 'next/link'
import ConnectWallet from '../ConnectWallet'
import { ModeToggle } from '../ModeToggle'
import Menu from './Menu'
import Main from './Main'

export default function Nav() {
  return (
    // sticky top-0 backdrop-blur-sm
    <nav className='z-10'>
      <Main className='flex items-center justify-between px-4 py-4'>
        <div className='flex items-center gap-6'>
          <Link className='cursor-pointer text-xl font-semibold' href={'/'}>
            Media Platform
          </Link>

          <Menu />
        </div>

        <div className='flex gap-2'>
          <ConnectWallet />

          <ModeToggle />
        </div>
      </Main>
    </nav>
  )
}
