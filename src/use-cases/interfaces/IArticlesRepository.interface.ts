export interface IArticlesRepository {
  LOCAL_GATEWAY: string
  PUBLIC_GATEWAY: string
  pinCID(cid: string): Promise<boolean>
  uploadFile(file: File): Promise<string>
  prepareImagesGateway(content: string): Promise<string>
  uploadHtmlFromString(content: string): Promise<string>
  uploadHtmlContent(content: string): Promise<string>
  getContentByCID(cid: string): Promise<string>
}
