'use client'

import { useAccount } from 'wagmi'
import ConnectWalletDialog from './ConnectWalletDialog'
import AccountDialog from './AccountDialog'

export default function ConnectWallet() {
  const { isConnected } = useAccount()

  if (isConnected) return <AccountDialog />

  return <ConnectWalletDialog />
}
