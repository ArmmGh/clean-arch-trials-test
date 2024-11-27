import PublicationPreview from '@/components/publications/publication-preview'
import { PresentedPublication } from '@/controllers/publications/get-publications-by-channel-address.controller'
import { PresentedChannelMetadata } from '@/controllers/channels/get-channel-metadata.controller'
import { use } from 'react'
import { Address } from 'viem'

export default function Publications({
  promisedChannelMetadata,
  promisedPublications,
  channelAddress,
}: {
  promisedChannelMetadata: Promise<PresentedChannelMetadata | null>
  promisedPublications: Promise<PresentedPublication[]>
  channelAddress: Address
}) {
  const [channelMetadata, publications] = use(Promise.all([promisedChannelMetadata, promisedPublications]))

  return (
    <div>
      {publications.length ? (
        <div className='space-y-[13px] pb-5'>
          {publications.map((publication, index: number) => (
            <PublicationPreview
              channelAddress={channelAddress}
              key={index}
              channelMetadata={channelMetadata}
              {...publication}
            />
          ))}
        </div>
      ) : (
        <div>No publications found</div>
      )}
    </div>
  )
}
