import { Article } from '@/entities/models/article'

export interface IArticlesRepository {
  LOCAL_GATEWAY: string
  PUBLIC_GATEWAY: string
  pinCID(cid: string): Promise<boolean>
  uploadFile(file: File): Promise<string>
  draftArticle(
    channelAddress: string,
    articleContent: string,
    articleMetadata: {
      value: string
      key: string
    }[],
  ): Promise<Article | null>
  getDraftedArticlesCount(channelAddress: string): Promise<number>
  getDraftedArticles(channelAddress: string): Promise<any[]>
  prepareImagesGateway(content: string): Promise<string>
  uploadHtmlFromString(content: string): Promise<{ html: string; cid: string }>
  uploadHtmlContent(content: string): Promise<string>
  getContentByCID(cid: string): Promise<string>
}
