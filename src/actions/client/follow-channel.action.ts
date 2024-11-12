import { InputParseError } from '@/entities/errors/common'
import { writeFollowChannelsFollowChannel } from '@/generated'
import { config } from '@/lib/config/wagmi'
import { openStatusToast, openWaitingToast } from '@/lib/utils'
import { isAddress } from 'viem'
import { waitForTransactionReceipt } from 'wagmi/actions'
import { z } from 'zod'

const inputSchema = z.object({
  channelAddress: z.string().refine((value) => isAddress(value)),
})

async function followChannelAction(input: z.infer<typeof inputSchema>) {
  try {
    const { data, error: inputParseError } = inputSchema.safeParse(input)

    if (inputParseError) {
      throw new InputParseError(inputParseError.message)
    }

    const txHash = await writeFollowChannelsFollowChannel(config, { args: [data.channelAddress] })

    openWaitingToast()

    const { status } = await waitForTransactionReceipt(config, { hash: txHash })

    if (status !== 'success') {
      throw new Error('Transaction failed')
    }
  } catch (error) {
    console.log('Error in followChannelAction: ', error)
    openStatusToast(true)

    return { error: true }
  }

  openStatusToast(false)
  return { success: true }
}

export { followChannelAction }
