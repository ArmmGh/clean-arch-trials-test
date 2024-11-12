'use client'

import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { trimAddress } from '@/utils/trimAddress'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function AccountDialog() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div className='flex items-center gap-1' suppressHydrationWarning={true}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className='flex gap-1'>
            {address && <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />}

            {address && <div>{trimAddress(address)}</div>}
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
          </DialogHeader>

          <div>{address && <p className='whitespace-normal'>{trimAddress(address, 8, 8)}</p>}</div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'destructive'} onClick={() => disconnect()}>
                Disconnect
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant={'outline'}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
