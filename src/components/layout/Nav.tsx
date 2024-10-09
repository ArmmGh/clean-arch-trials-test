import Link from 'next/link'
import ConnectWallet from '../ConnectWallet'
import { ModeToggle } from '../ModeToggle'
import Menu from './Menu'

export default function Nav() {
  return (
    <nav className='sticky top-0 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
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
      </div>
    </nav>
  )
}
