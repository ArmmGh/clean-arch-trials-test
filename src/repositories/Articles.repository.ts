import { IArticlesRepository } from '@/use-cases/interfaces/IArticlesRepository.interface'
import { injectable } from 'inversify'
import { type KuboRPCClient, create } from 'kubo-rpc-client'

@injectable()
export class ArticlesRepository implements IArticlesRepository {
  public PUBLIC_GATEWAY
  public LOCAL_GATEWAY
  private kuboClient: KuboRPCClient

  constructor() {
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

  async prepareImagesGateway(content: string): Promise<string> {
    const regex = new RegExp(this.LOCAL_GATEWAY, 'g')
    const newContent = content.replace(regex, this.PUBLIC_GATEWAY)

    return newContent
  }

  async pinCID(cid: string): Promise<boolean> {
    const pinned = await this.kuboClient.pin.add(cid)
    const isPinned = pinned ? !!pinned.toString() : false

    return isPinned
  }

  async uploadHtmlFromString(content: string): Promise<string> {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Article</title>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `

    const { cid } = await this.kuboClient.add(htmlContent)

    return cid.toString()
  }

  async uploadFile(file: File): Promise<string> {
    const { cid } = await this.kuboClient.add(file)
    return cid.toString()
  }

  async uploadHtmlContent(content: string): Promise<string> {
    const { cid } = await this.kuboClient.add(content)

    return cid.toString()
  }

  async getContentByCID(cid: string): Promise<string> {
    const isKuboOnline = await this.kuboClient?.isOnline()

    if (!isKuboOnline) {
      const res = await fetch(`${this.PUBLIC_GATEWAY}${cid}`)

      if (res.status === 200) {
        return res.text()
      }

      return ''
    }

    const content: AsyncIterable<Uint8Array> = await this.kuboClient.cat(cid)

    let result = ''
    for await (const chunk of content) {
      result += new TextDecoder().decode(chunk)
    }

    return result
  }
}
