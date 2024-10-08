'use client'

import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <>
      <div>
        <header className='mx-auto max-w-screen-xl font-bold sm:font-light'>
          <div className='flex justify-between'>
            <h2>Account</h2>

            <ModeToggle />
          </div>
        </header>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && <Button onClick={() => disconnect()}>Disconnect</Button>}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <Button variant={'outline'} key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </Button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  )
}

export default App
