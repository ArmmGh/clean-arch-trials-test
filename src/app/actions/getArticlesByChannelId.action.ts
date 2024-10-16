'use server'

import getArticlesByChannelIdUseCase from '@/use-cases/get-articles-by-channel-id.use-case'
import { Address } from 'viem'

export default async function getArticlesByChannelIdAction({
  channelId,
  owner,
}: {
  channelId: Address | string
  owner: Address | string
}) {
  try {
    console.log({ id: channelId, owner })
    const articles = await getArticlesByChannelIdUseCase({ id: channelId, owner })

    return articles
  } catch (error) {
    console.error(error)

    // return []
  }
}
