import { factoryAbi } from '@/abi/factoryAbi'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'
import { Address, getAddress, PublicClient } from 'viem'
import { injectable } from 'inversify'
import { articleFactoryAbi } from '@/abi/articleFactoryAbi'
import { contracts } from '@/lib/config/contracts'
import { createViemClient } from '@/lib/utils/viemClient'

@injectable()
export class ChannelsRepository implements IChannelsRepository {
  private client: PublicClient

  constructor() {
    this.client = createViemClient()
  }

  // Fetch IDs from your smart contract
  async getAllChannelIds({ publisherAddress }: { publisherAddress: Address }) {
    // TODO: return array of addresses
    const ids = await this.client.readContract({
      abi: factoryAbi,
      functionName: 'getUserERC721Address',
      args: [publisherAddress],
      address: contracts.factoryAddress,
    })

    return [ids]
  }

  async getChannelById({ id }: { id: Address }) {
    const channelFactoryContract = {
      abi: articleFactoryAbi,
      address: id,
    }

    const [name, symbol, owner] = await Promise.all([
      this.client.readContract({
        ...channelFactoryContract,
        functionName: 'name',
      }),
      this.client.readContract({
        ...channelFactoryContract,
        functionName: 'symbol',
      }),
      this.client.readContract({
        ...channelFactoryContract,
        functionName: 'owner',
      }),
    ])

    return {
      name,
      symbol,
      owner,
    }
  }

  async getChannelOwnerById({ id }: { id: Address }) {
    const owner = await this.client.readContract({
      abi: articleFactoryAbi,
      address: id,
      functionName: 'owner',
    })

    return owner
  }

  async getArticlesCountByChannelId({
    id,
    publisherAddress,
  }: {
    id: string | Address
    publisherAddress: string | Address
  }) {
    const articlesCount = await this.client.readContract({
      abi: articleFactoryAbi,
      address: getAddress(id),
      functionName: 'balanceOf',
      args: [getAddress(publisherAddress)],
    })

    return articlesCount
  }

  async getArticleById({ channelId, id }: { channelId: Address; id: bigint }) {
    const [tokenURI, tokenURIContract] = await Promise.all([
      this.client.readContract({
        abi: articleFactoryAbi,
        address: channelId,
        functionName: 'tokenURI',
        args: [id],
      }),
      this.client.readContract({
        abi: articleFactoryAbi,
        address: channelId,
        functionName: 'tokenURIContracts',
        args: [id],
      }),
    ])

    return { tokenURI, tokenURIContract }
  }
}
