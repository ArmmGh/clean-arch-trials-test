import { Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'

export default async function saveArticleUseCase(
  channelAddress: string,
  articleContent: string,
  articleMetadata: {
    value: string
    key: string
  }[],
): Promise<Article['metadata'] | null> {
  const articlesRepo = getInjection('IArticlesRepository')

  const updatedContent = await articlesRepo.prepareImagesGateway(articleContent)

  const htmlContentCID = await articlesRepo.uploadHtmlContent(updatedContent)
  const htmlCID = await articlesRepo.uploadHtmlFromString(updatedContent)

  //TODO: generate image from html and add to image metadata
  const updatedMetadata = [
    ...articleMetadata,
    { key: 'htmlContent', value: htmlContentCID },
    { key: 'html', value: `${articlesRepo.PUBLIC_GATEWAY}${htmlCID}` },
  ]

  return updatedMetadata
}
