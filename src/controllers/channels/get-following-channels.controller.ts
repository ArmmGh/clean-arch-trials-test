// import { InputParseError, UnauthorizeError } from '@/entities/errors/common'
// import { Channel } from '@/entities/models/channel'
// import getFollowingChannelsUseCase from '@/use-cases/channels/get-following-channels.use-case'
// import { Address, getAddress, isAddress } from 'viem'
// import { z } from 'zod'
// import { PresentedChannel } from './get-all-channels.controller'

// function presenter(data: Channel[]) {
//   return data.map(({ channel_address, name, description, avatar_url, id }) => {
//     return {
//       channel_address: getAddress(channel_address),
//       name: name || 'Unknown',
//       description: description || 'No description',
//       avatar_url,
//       id,
//     }
//   })
// }

// const inputSchema = z.string().refine((val) => isAddress(val))

// export default async function getFollowingChannelsController(userAddress: Address) {
//   try {
//     const { data, error: inputParseError } = inputSchema.safeParse(userAddress)

//     if (inputParseError) {
//       throw new InputParseError(inputParseError.message)
//     }

//     const channels = await getFollowingChannelsUseCase(data)

//     return presenter(channels)
//   } catch (error) {
//     if (error instanceof UnauthorizeError || error instanceof InputParseError) {
//       console.error(error.message)
//     } else {
//       console.log(error)
//     }

//     return []
//   }
// }
