import { MetadataItem } from '@/app/dashboard/create-article/components/article-creation-stepper'
import { getInjection } from '@/lib/di/container'

export default async function prepareArticleMetadataUseCase(
  articleContent: string,
  articleMetadata: {
    value: string
    key: string
  }[],
): Promise<MetadataItem[]> {
  const articlesRepo = getInjection('IArticlesRepository')

  const htmlContentCID = await articlesRepo.uploadHtmlContent(articleContent)
  const updatedMetadata = [...articleMetadata, { key: 'htmlContent', value: htmlContentCID }]

  return updatedMetadata
}
