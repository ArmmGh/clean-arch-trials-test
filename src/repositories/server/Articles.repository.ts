import { channelAbi } from '@/abi/channel-abi'
import { createViemClient } from '@/lib/utils/viemClient'
import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { type KuboRPCClient, create } from 'kubo-rpc-client'
import { Address, PublicClient } from 'viem'

export class ArticlesRepository implements IArticlesRepository {
  public PUBLIC_GATEWAY
  public LOCAL_GATEWAY
  private kuboClient: KuboRPCClient
  private client: PublicClient

  constructor() {
    this.client = createViemClient()
    this.kuboClient = create({
      host: process.env.KUBO_HOST,
      port: process.env.KUBO_PORT,
      protocol: process.env.KUBO_PROTOCOL,
    })
    this.PUBLIC_GATEWAY = process.env.IPFS_PUBLIC_GATEWAY!
    this.LOCAL_GATEWAY =
      process.env.IPFS_LOCAL_GATEWAY ??
      `${process.env.KUBO_PROTOCOL}://${process.env.KUBO_HOST}:${process.env.KUBO_GATEWAY_PORT}/ipfs/`
  }

  async getArticleTokenURIByNftId(channelAddress: Address, articleId: number): Promise<string> {
    const tokenURI = await this.client.readContract({
      abi: channelAbi,
      address: channelAddress,
      functionName: 'tokenURI',
      args: [BigInt(articleId)],
    })

    return tokenURI
  }

  // TODO: need to move this kind of stuff outside of the repo
  async prepareImagesGateway(content: string): Promise<string> {
    const regex = new RegExp(`${this.LOCAL_GATEWAY}(\\w+)`, 'g')
    const newContent = content.replace(regex, 'ipfs://$1')

    return newContent
  }

  async pinCID(cid: string): Promise<boolean> {
    const pinned = await this.kuboClient.pin.add(cid)
    const isPinned = pinned ? !!pinned.toString() : false

    return isPinned
  }

  async uploadFile(file: File): Promise<string> {
    const { cid } = await this.kuboClient.add(file)
    return cid.toString()
  }

  async uploadHtmlContent(content: string): Promise<string> {
    const { cid } = await this.kuboClient.add(content)

    return cid.toString()
  }

  async getContentByCID(cid: string) {
    const content = this.kuboClient.cat(cid)

    return content
  }
}
