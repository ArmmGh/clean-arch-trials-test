import { config } from '@/lib/config/wagmi'
import { getInjection } from '@/lib/di/container'
import { Address, Hash } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

export default async function whitelistChannelUseCase(txHash: Hash, channelAddress: Address) {
  const tx = await waitForTransactionReceipt(config, { hash: txHash })

  if (tx.status === 'reverted') {
    throw new Error('Transaction reverted')
  }

  const channelsRepo = getInjection('IChannelsRepository')

  return channelsRepo.whitelistChannelRequest(channelAddress)
}
