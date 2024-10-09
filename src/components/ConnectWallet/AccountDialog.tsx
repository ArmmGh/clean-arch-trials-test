import { useAccount, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { trimAddress } from '@/app/utils/trimAddress'
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
    <div className='flex items-center gap-1'>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} className='flex gap-1'>
            {address && <div>{trimAddress(address)}</div>}

            {address && <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />}
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
