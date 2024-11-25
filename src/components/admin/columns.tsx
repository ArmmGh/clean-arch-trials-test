'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { PresenterType } from '@/controllers/get-channel-requests-for-admin.controller'
import { trimAddress } from '@/utils/trimAddress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Loader2, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ChannelRequest } from '@/entities/types/channels/channel-request.type'
import { writeMediaPlatformRemoveWhitelistedChannel, writeMediaPlatformWhitelistChannels } from '@/generated'
import { config } from '@/lib/config/wagmi'
import { getAddress } from 'viem'
import { toast } from '@/hooks/use-toast'
import markChannelAsBlacklistedAction from '@/actions/admin/mark-channel-as-blacklisted.action'
import whitelistChannelAction from '@/actions/admin/whitelist-channel.action'
import blacklistChannelAction from '@/actions/admin/blacklist-channel.action'
import { openStatusToast, openWaitingToast } from '@/lib/utils'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
//

function addressFormatter({ ...props }) {
  const formattedAddress = trimAddress(props.getValue('channelAddress'))

  return <div className='font-medium'>{formattedAddress}</div>
}

export const columns: ColumnDef<PresenterType>[] = [
  {
    accessorKey: 'channelAddress',
    header: 'Channel Address',
    cell: addressFormatter,
  },
  {
    accessorKey: 'channelOwner',
    header: 'Channel Owner',
    cell: addressFormatter,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'reason',
    header: 'Reason',
    cell: ({ row }) => {
      return 'N/A'
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as ChannelRequest['status']

      const variant = status === 'blacklisted' ? 'destructive' : status === 'whitelisted' ? 'success' : 'default'

      return (
        <Badge className='capitalize' variant={variant}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const channelAddress = getAddress(row.original.channelAddress)
      const isWhitelisted = row.original.status === 'whitelisted'
      const isBlacklisted = row.original.status === 'blacklisted'
      const isPending = row.original.status === 'pending'

      const whitelist = async () => {
        const hash = await writeMediaPlatformWhitelistChannels(config, { args: [[channelAddress]] })

        openWaitingToast()

        // TODO: add confirmation modal later
        const { error } = await whitelistChannelAction(hash, channelAddress)

        openStatusToast(error)
      }

      const markChannelAsBlacklist = async () => {
        // TODO: change name to blacklist
        openWaitingToast('Loading', 'Please wait!')
        const { error } = await markChannelAsBlacklistedAction(channelAddress)

        openStatusToast(error)
      }

      const blacklistChannel = async () => {
        const hash = await writeMediaPlatformRemoveWhitelistedChannel(config, { args: [[channelAddress]] })

        openWaitingToast()

        // TODO: add confirmation modal later
        const { error } = await blacklistChannelAction(hash, channelAddress)

        openStatusToast(error)
      }

      const blacklist = () => {
        if (isWhitelisted) {
          blacklistChannel()
        } else {
          markChannelAsBlacklist()
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {(isBlacklisted || isPending) && <DropdownMenuItem onClick={whitelist}>Whitelist</DropdownMenuItem>}
            {(isWhitelisted || isPending) && <DropdownMenuItem onClick={blacklist}>Blacklist</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>View Publisher</DropdownMenuItem>
            <DropdownMenuItem disabled>View Articles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
