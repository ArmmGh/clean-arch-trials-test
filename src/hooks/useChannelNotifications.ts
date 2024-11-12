'use client'

import markChannelAsReadAction from '@/actions/mark-channel-as-read.action'
import { createClient } from '@/lib/utils/supabase/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Address } from 'viem'

export function useChannelNotifications(channelAddress: Address, userAddress: Address) {
  const [hasNotification, setHasNotification] = useState(false)
  const searchParams = useSearchParams()
  const activeChannel = searchParams.get('channel')

  useEffect(() => {
    // Mark as read when this channel becomes active
    if (activeChannel === channelAddress && hasNotification) {
      const markAsRead = async () => {
        await markChannelAsReadAction({ channelAddress, userAddress })

        setHasNotification(false)
      }

      markAsRead()
    }
  }, [activeChannel, channelAddress, userAddress, hasNotification])

  useEffect(() => {
    const supabase = createClient()

    // Subscribe only to user's notifications and filter channel in the callback
    const channel = supabase
      .channel(`notifications-${channelAddress}-${userAddress}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'channel_notifications',
          filter: `user_address=eq.${userAddress}`,
        },
        (payload) => {
          if (payload.new.channel_address === channelAddress) {
            setHasNotification(true)
          }
        },
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'channel_notifications',
          filter: `user_address=eq.${userAddress}`,
        },
        (payload) => {
          if (payload.old.channel_address === channelAddress) {
            setHasNotification(false)
          }
        },
      )
      .subscribe()

    // Check initial notification state
    const checkNotification = async () => {
      const { data } = await supabase
        .from('channel_notifications')
        .select('*')
        .eq('channel_address', channelAddress)
        .eq('user_address', userAddress)
        .maybeSingle()

      setHasNotification(!!data)
    }

    checkNotification()

    return () => {
      channel.unsubscribe()
    }
  }, [channelAddress, userAddress])

  return hasNotification
}
