// 'use server'

// import { factoryAbi, readArticleFactoryBalanceOf, readFactoryGetUserErc721Address } from '@/generated'
// import { config, getConfig, transports } from '@/wagmi'
// import { Address, createPublicClient, Chain, http, getContract } from 'viem'
// // import type { Chain } from 'wagmi/chains'
// // import { getClient, getPublicClient, readContract } from '@wagmi/core'

// export default async function getPublisherNftsAction(input: { chain: Chain; address: Address }) {
//   try {
//     const client = createPublicClient({ transport: http(), chain: input.chain })
//     const factoryContract = getContract({ abi: factoryAbi, address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9' })

//     const userErc721Address = await client.readContract({
//       abi: factoryAbi,
//       address: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
//       functionName: 'getUserERC721Address',
//       args: [input.address],
//     })

//     console.log('userErc721Address: ', userErc721Address)
//     // const nftAddress = await readFactoryGetUserErc721Address(config, { args: [input.address] })
//     // console.log('nftAddress: ', nftAddress)

//     return []
//   } catch (error) {
//     console.error(error)
//   }

//   return []
// }
