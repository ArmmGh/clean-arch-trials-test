import { getInjection } from '@/lib/di/container'

export default async function uploadArticleImageToIPFSUseCase(file: File): Promise<string> {
  const articlesRepo = getInjection('IArticlesRepository')

  const cid = await articlesRepo.uploadFile(file)

  const url = `${articlesRepo.LOCAL_GATEWAY}${cid}`

  return url
}
