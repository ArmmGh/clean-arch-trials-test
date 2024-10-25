// TODO: maybe remove fully

// 'use client'

// import WithAuth from '@/components/HOC/withAuth'
// import NoChannels from '@/components/NoChannels'
// import type { Channel as ChannelType } from '@/entities/models/channel'
// import { useState } from 'react'

// function DashboardChannels({ channels }: { channels: ChannelType[] }) {
//   const [activeChannel, setActiveChannel] = useState<ChannelType>()

//   if (channels.length === 0) return <NoChannels />

//   return null
//   // return (
//   //   <div className='border-1 flex flex-1 flex-row overflow-hidden'>
//   //     <ScrollArea className='w-1/3 flex-1 border-r'>
//   //       {channels?.map((channel, index: any) => (
//   //         <Channel
//   //           isActive={activeChannel?.address === channel.address}
//   //           onChannelClick={() => setActiveChannel(channel)}
//   //           key={index}
//   //           channel={channel}
//   //           isOwner={true}
//   //         />
//   //       ))}
//   //     </ScrollArea>

//   //     <ScrollArea className='w-2/3 p-6'>
//   //       {activeChannel && <Articles channelAddress={activeChannel.address} channelOwner={activeChannel.owner} />}
//   //     </ScrollArea>
//   //   </div>
//   // )
// }

// export default WithAuth(DashboardChannels)
