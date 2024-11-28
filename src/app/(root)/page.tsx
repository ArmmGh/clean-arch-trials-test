import getAddressFromSession from '@/actions/utils/get-address-from-session.util'
import PublicationSmall from '@/components/publications/publication-small'
import getAllPublicationsController from '@/controllers/publications/get-all-publications.controller'
import React from 'react'
import { Address } from 'viem'

export type SearchParams = {
  channel?: string
}

const getAllPublications = async (userAddress?: Address) => {
  try {
    return getAllPublicationsController()
  } catch (error) {
    console.error(error)

    return []
  }
}

export default async function RootPage(props: { searchParams: Promise<SearchParams> }) {
  const userAddress = await getAddressFromSession()
  const publications = await getAllPublications(userAddress)

  return (
    <div className='grid grid-cols-3 gap-[30px] py-6'>
      {publications.map((publication, index) => (
        <PublicationSmall
          index={publication.index}
          href={publication.href}
          channelAddress={publication.channelAddress}
          date={publication.date}
          name={publication.name}
          description={publication.description}
          image={publication.image}
          key={`${publication.index}:${index}`}
          channelImage={publication.channelImage}
          channelName={publication.channelName}
        />
      ))}
    </div>
  )
}
