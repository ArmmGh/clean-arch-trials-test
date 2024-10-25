'use server'

import { config } from '@/lib/config/wagmi'

import { Address } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

export default async function waitForTransactionAction(hash: Address, channelAddress: Address) {
  const tx = await waitForTransactionReceipt(config, { hash })

  return tx
}
