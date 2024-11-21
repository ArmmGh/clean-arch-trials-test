// import { UnauthorizeError } from '@/entities/errors/common'
// import { Channel } from '@/entities/models/channel'
// import { getInjection } from '@/lib/di/container'
// import { Address } from 'viem'

// export default async function getFollowingChannelsUseCase(userAddress?: Address): Promise<Channel[]> {
//   const channelsRepo = getInjection('IChannelsRepository')

//   if (!userAddress) {
//     throw new UnauthorizeError('Unauthorized access')
//   }

//   const rawChannels = await channelsRepo.getFollowingChannels(userAddress)

//   // const [channels] = await Promise.all([
//   //   Promise.all(rawChannels.map((address) => channelsRepo.getChannelByAddress(address))),
//   // ])

//   return rawChannels.map((address, index) => ({
//     ...channels[index],
//     // followersCount: followersCounts[index],
//     status: 'whitelisted',
//     address,
//     isFollowing: true,
//     // isFollowing: followingStatuses ? followingStatuses[index] : false,
//   }))
// }
