import { Article } from '@/entities/models/article'
import { getInjection } from '@/lib/di/container'

export default async function saveArticleUseCase(
  channelAddress: string,
  articleContent: string,
  articleMetadata: {
    value: string
    key: string
  }[],
): Promise<Article | null> {
  const articlesRepo = getInjection('IArticlesRepository')

  // Check to have 1 drafted article
  // const draftedArticles = await articlesRepo.getDraftedArticlesCount(channelAddress)

  // TODO: shouild be some limit, but need to remove succesfull ones after mint
  // if (draftedArticles === 1) {
  //   throw new DraftLimitExceed('Max 1 article can be saved')
  // }

  const updatedContent = await articlesRepo.prepareImagesGateway(articleContent)

  const htmlContentCID = await articlesRepo.uploadHtmlContent(updatedContent)
  const { cid: htmlCID, html } = await articlesRepo.uploadHtmlFromString(updatedContent)

  //TODO: generate image from html and add to image metadata
  const updatedMetadata = [
    ...articleMetadata,
    { key: 'htmlContent', value: htmlContentCID },
    { key: 'html', value: `${articlesRepo.PUBLIC_GATEWAY}${htmlCID}` },
  ]

  const article = await articlesRepo.draftArticle(channelAddress, html, updatedMetadata)

  return article
}
