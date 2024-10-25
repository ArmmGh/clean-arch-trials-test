// TODO: Maybe fully remove

// import { ScrollArea } from '@/components/ui/scroll-area'
// import type { Channel as ChannelType } from '@/entities/models/channel'
// import Channel from './Channel'

// export default function Channels({ channels }: { channels: ChannelType[] }) {
//   // const [activeChannel, setActiveChannel] = useState<ChannelType>()
//   // const [channelNotifications, setChannelNotifications] = useState<Record<string, boolean>>({})
//   // const router = useRouter()

//   // const { address: userAddress } = useAccount()
//   // const { data: followedChannels = [], refetch: refetchFollowedChannels } = useQuery({
//   //   queryKey: ['followed-channels', userAddress],
//   //   queryFn: () => getFollowedChannelsAction(userAddress!),
//   //   enabled: !!userAddress,
//   // })

//   // const { data: notifications, refetch: refetchNotifications } = useQuery({
//   //   queryKey: ['notifications', userAddress],
//   //   queryFn: () => getNotificationsAction(userAddress!),
//   //   enabled: !!userAddress,
//   // })

//   // useEffect(() => {
//   //   if (!notifications?.length) return

//   //   const newChannelNotifications = notifications.reduce((acc: Record<string, boolean>, notification: string) => {
//   //     acc[notification] = true
//   //     return acc
//   //   }, {})

//   //   setChannelNotifications(newChannelNotifications)
//   // }, [notifications])

//   // useEffect(() => {
//   //   if (!userAddress) return

//   //   router.refresh()

//   //   const supabase = createClient()

//   //   const channel = supabase
//   //     .channel('public:channel_notifications')
//   //     .on(
//   //       'postgres_changes',
//   //       {
//   //         event: 'INSERT',
//   //         schema: 'public',
//   //         table: 'channel_notifications',
//   //         filter: `user_address=eq.${userAddress}`,
//   //       },
//   //       (payload) => {
//   //         console.log('new notification: ', payload)
//   //         setChannelNotifications((prev) => ({
//   //           ...prev,
//   //           [payload.new.channel_address]: true,
//   //         }))
//   //       },
//   //     )
//   //     .subscribe()

//   //   return () => {
//   //     supabase.removeChannel(channel)
//   //   }
//   // }, [userAddress])

//   // const isFollowing = useCallback(
//   //   (channelAddress: Address) => {
//   //     return followedChannels.includes(channelAddress)
//   //   },
//   //   [followedChannels],
//   // )

//   // const handleChannelClick = async (channel: ChannelType) => {
//   //   setActiveChannel(channel)

//   //   if (channelNotifications[channel.address] && userAddress) {
//   //     const { success } = await markChannelAsReadAction({ userAddress, channelAddress: channel.address })

//   //     if (success) {
//   //       setChannelNotifications((prev) => ({
//   //         ...prev,
//   //         [channel.address]: false,
//   //       }))
//   //     }

//   //     refetchNotifications()
//   //   }
//   // }

//   if (channels.length === 0) {
//     return <div className='px-4'>No channels found</div>
//   }

//   return (
//     <div className='border-1 flex flex-1 flex-row overflow-hidden'>
//       <ScrollArea className='w-1/3 border-r'>
//         {channels.map((channel, index: any) => (
//           <Channel
//             key={index}
//             // isActive={activeChannel?.address === channel.address}
//             // onChannelClick={() => handleChannelClick(channel)}
//             channel={channel}
//             // userAddress={userAddress}
//             // isUnread={channelNotifications[channel.address]}
//             // isFollowing={channel.isFollowing ?? isFollowing(channel.address)}
//             // isFollowing={channel.isFollowing}
//             // refetchFollowedChannels={refetchFollowedChannels}
//           />
//         ))}
//       </ScrollArea>

//       <ScrollArea className='w-2/3 p-6'>
//         {/* {activeChannel && <Articles channelAddress={activeChannel.address} channelOwner={activeChannel.owner} />} */}
//       </ScrollArea>
//     </div>
//   )
// }

// // 'use client'

// // import getFollowedChannelsAction from '@/app/actions/getFollowedChannels.action'
// // import getNotificationsAction from '@/app/actions/getNotifications.action'
// // import markChannelAsReadAction from '@/app/actions/mark-channel-as-read.action'
// // import Articles from '@/components/articles/Articles'
// // import { ScrollArea } from '@/components/ui/scroll-area'
// // import type { Channel as ChannelType } from '@/entities/models/channel'
// // import { createClient } from '@/lib/utils/supabase/client'
// // import { useQuery } from '@tanstack/react-query'
// // import { useRouter } from 'next/navigation'
// // import { useEffect, useState } from 'react'
// // import { useAccount } from 'wagmi'
// // import Channel from './Channel'

// // export default function Channels({ channels }: { channels: ChannelType[] }) {
// //   const [activeChannel, setActiveChannel] = useState<ChannelType>()
// //   const [channelNotifications, setChannelNotifications] = useState<Record<string, boolean>>({})
// //   const router = useRouter()

// //   const { address: userAddress } = useAccount()
// //   const { data: followedChannels = [], refetch: refetchFollowedChannels } = useQuery({
// //     queryKey: ['followed-channels', userAddress],
// //     queryFn: () => getFollowedChannelsAction(userAddress!),
// //     enabled: !!userAddress,
// //   })

// //   const { data: notifications, refetch: refetchNotifications } = useQuery({
// //     queryKey: ['notifications', userAddress],
// //     queryFn: () => getNotificationsAction(userAddress!),
// //     enabled: !!userAddress,
// //   })

// //   useEffect(() => {
// //     if (!notifications?.length) return

// //     const newChannelNotifications = notifications.reduce((acc: Record<string, boolean>, notification: string) => {
// //       acc[notification] = true
// //       return acc
// //     }, {})

// //     setChannelNotifications(newChannelNotifications)
// //   }, [notifications])

// //   useEffect(() => {
// //     if (!userAddress) return

// //     router.refresh()

// //     const supabase = createClient()

// //     const channel = supabase
// //       .channel('public:channel_notifications')
// //       .on(
// //         'postgres_changes',
// //         {
// //           event: 'INSERT',
// //           schema: 'public',
// //           table: 'channel_notifications',
// //           filter: `user_address=eq.${userAddress}`,
// //         },
// //         (payload) => {
// //           console.log('new notification: ', payload)
// //           setChannelNotifications((prev) => ({
// //             ...prev,
// //             [payload.new.channel_address]: true,
// //           }))
// //         },
// //       )
// //       .subscribe()

// //     return () => {
// //       supabase.removeChannel(channel)
// //     }
// //   }, [userAddress])

// //   // const isFollowing = useCallback(
// //   //   (channelAddress: Address) => {
// //   //     return followedChannels.includes(channelAddress)
// //   //   },
// //   //   [followedChannels],
// //   // )

// //   const handleChannelClick = async (channel: ChannelType) => {
// //     setActiveChannel(channel)

// //     if (channelNotifications[channel.address] && userAddress) {
// //       const { success } = await markChannelAsReadAction({ userAddress, channelAddress: channel.address })

// //       if (success) {
// //         setChannelNotifications((prev) => ({
// //           ...prev,
// //           [channel.address]: false,
// //         }))
// //       }

// //       refetchNotifications()
// //     }
// //   }

// //   if (channels.length === 0) {
// //     return <div className='px-4'>No channels found</div>
// //   }

// //   return (
// //     <div className='border-1 flex flex-1 flex-row overflow-hidden'>
// //       <ScrollArea className='w-1/3 border-r'>
// //         {channels.map((channel, index: any) => (
// //           <Channel
// //             key={index}
// //             isActive={activeChannel?.address === channel.address}
// //             onChannelClick={() => handleChannelClick(channel)}
// //             channel={channel}
// //             userAddress={userAddress}
// //             isUnread={channelNotifications[channel.address]}
// //             // isFollowing={channel.isFollowing ?? isFollowing(channel.address)}
// //             isFollowing={channel.isFollowing}
// //             refetchFollowedChannels={refetchFollowedChannels}
// //           />
// //         ))}
// //       </ScrollArea>

// //       <ScrollArea className='w-2/3 p-6'>
// //         {activeChannel && <Articles channelAddress={activeChannel.address} channelOwner={activeChannel.owner} />}
// //       </ScrollArea>
// //     </div>
// //   )
// // }
