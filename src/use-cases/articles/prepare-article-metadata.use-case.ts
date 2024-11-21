import { MetadataItem } from '@/app/dashboard/create-article/components/article-creation-stepper'
import { getInjection } from '@/lib/di/container'
import DOMPurify from 'isomorphic-dompurify'

export default async function prepareArticleMetadataUseCase(
  articleContent: string,
  articleMetadata: {
    value: string
    key: string
  }[],
): Promise<MetadataItem[]> {
  const articlesRepo = getInjection('IArticlesRepository')

  const sanitizedContent = DOMPurify.sanitize(articleContent)
  const htmlContentCID = await articlesRepo.uploadHtmlContent(sanitizedContent)
  const updatedMetadata = [...articleMetadata, { key: 'htmlContent', value: htmlContentCID }]

  return updatedMetadata
}
