import { channelLedgerAbi } from '@/abi/channel-ledger-abi'
import { config } from '@/lib/config/wagmi'
import { getInjection } from '@/lib/di/container'
import { Hash, parseEventLogs } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'

export default async function AddChannelRequestUseCase(txHash: Hash) {
  const tx = await waitForTransactionReceipt(config, { hash: txHash })

  if (tx.status === 'reverted') {
    throw new Error('Transaction was reverted')
  }

  const channelsRepo = getInjection('IChannelsRepository')

  const logs = parseEventLogs({
    abi: channelLedgerAbi,
    logs: tx.logs,
  })

  const publisherRegisteredEvent = logs.find((log) => log.eventName === 'PublisherRegistered')

  const { channel, publisher } = publisherRegisteredEvent?.args || {}

  if (!channel || !publisher) {
    throw new Error('Could not find channel or publisher in logs')
  }

  return channelsRepo.addChannelRequest(channel, publisher)
}
