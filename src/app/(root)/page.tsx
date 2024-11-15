import getAddressFromSession from '@/actions/utils/get-address-from-session.util'
import ArticleItemSmall from '@/components/articles/article-item-small'
import getLatestArticlesController from '@/controllers/articles/get-latest-articles.controller'
import React from 'react'
import { Address } from 'viem'

export type SearchParams = {
  channel?: string
}

const getLatestArticles = async (userAddress?: Address) => {
  try {
    return getLatestArticlesController({ userAddress })
  } catch (error) {
    console.error(error)

    return []
  }
}

export default async function RootPage(props: { searchParams: Promise<SearchParams> }) {
  const userAddress = await getAddressFromSession()
  const articles = await getLatestArticles(userAddress)

  return (
    <div className='grid grid-cols-3 gap-[30px] py-6'>
      {articles.map((article, index) => (
        <ArticleItemSmall
          id={article.id}
          channelAddress={article.channelAddress}
          date={article.date}
          name={article.name}
          description={article.description}
          image={article.image}
          key={index}
        />
      ))}
    </div>
  )
}
