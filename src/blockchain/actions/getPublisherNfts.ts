import {
  readArticleFactoryBalanceOf,
  readArticleFactoryTokenUri,
  readArticleFactoryTokenUriContracts,
} from '@/generated'
import { config } from '@/lib/config/wagmi'
import { Address } from 'viem'

export async function getPublisherNfts({
  address: publisherAddress,
  nftAddress,
}: {
  address: Address | undefined
  nftAddress: Address | undefined
}): Promise<string[]> {
  if (!publisherAddress || !nftAddress) return []

  try {
    const tokenUrisPromises = []
    const nftCount = await readArticleFactoryBalanceOf(config, { args: [publisherAddress], address: nftAddress })

    for (let i = 0; i < nftCount; i++) {
      tokenUrisPromises.push(readArticleFactoryTokenUri(config, { args: [BigInt(i)], address: nftAddress }))
    }

    const tokenUris = await Promise.all(tokenUrisPromises)

    return tokenUris
  } catch (error) {
    console.error(error)
  }
  return []
}
