import { factoryAbi } from '@/abi/factoryAbi'
import { channelAbi } from '@/generated'
import { contracts } from '@/lib/config/contracts'
import { createViemClient } from '@/lib/utils/viemClient'
import { IChannelsRepository } from '@/use-cases/interfaces/IChannelsRepository.interface'
import { injectable } from 'inversify'
import { Address, PublicClient } from 'viem'

@injectable()
export class ChannelsRepository implements IChannelsRepository {
  private client: PublicClient

  constructor() {
    this.client = createViemClient()
  }

  async getAllChannelAddresses() {
    const addresses = await this.client.readContract({
      abi: factoryAbi,
      functionName: 'getAllChannels',
      address: contracts.factoryAddress,
    })

    return addresses
  }

  async getAllPublisherChannelAddresses(publisherAddress: Address) {
    const addresses = await this.client.readContract({
      abi: factoryAbi,
      functionName: 'getChannels',
      args: [publisherAddress],
      address: contracts.factoryAddress,
    })

    return addresses as Address[]
  }

  async getChannelByAddress(channelAddress: Address) {
    const channelContract = {
      abi: channelAbi,
      address: channelAddress,
    }

    const [name, symbol, owner] = await Promise.all([
      this.client.readContract({
        ...channelContract,
        functionName: 'name',
      }),
      this.client.readContract({
        ...channelContract,
        functionName: 'symbol',
      }),
      this.client.readContract({
        ...channelContract,
        functionName: 'owner',
      }),
    ])

    return {
      name,
      symbol,
      owner,
      address: channelAddress,
    }
  }

  async getChannelOwnerById({ id }: { id: Address }) {
    const owner = await this.client.readContract({
      abi: channelAbi,
      address: id,
      functionName: 'owner',
    })

    return owner
  }

  async getLastArticleId(channelAddress: Address) {
    const lastArticleId = await this.client.readContract({
      abi: channelAbi,
      address: channelAddress,
      functionName: 'articleIDs',
      args: [],
    })

    return lastArticleId
  }

  async getArticleById(channelAddress: Address, articleId: number): Promise<string> {
    const tokenURI = await this.client.readContract({
      abi: channelAbi,
      address: channelAddress,
      functionName: 'tokenURI',
      args: [BigInt(articleId)],
    })

    return tokenURI
  }
}
