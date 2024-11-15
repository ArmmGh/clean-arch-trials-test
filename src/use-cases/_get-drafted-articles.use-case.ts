import { getInjection } from '@/lib/di/container'
import { Address } from 'viem'

export default async function getDraftedArticlesUseCase(channelAddress: Address): Promise<any[]> {
  const articlesRepo = getInjection('IArticlesRepository')

  // Call repo fucntions

  return []
}
