import getPublicationsByChannelAddressController from '@/controllers/publications/get-publications-by-channel-address.controller'
import { Address } from 'viem'
import SuggestedChannels from './suggested-channels'
import getChannelMetadataController from '@/controllers/channels/get-channel-metadata.controller'
import { Suspense } from 'react'
import Publications from './publications'
import ChannelPublicationsSkeleton from '@/components/skeletons/channel-publications-skeleton'
import SuggestedChannelsSkeleton from '@/components/skeletons/suggested-channels-skeleton'

const getPublications = async (channelAddress: Address) => {
  try {
    return getPublicationsByChannelAddressController({ channelAddress })
  } catch (error) {
    return []
  }
}

const getChannelMetadata = async (channelAddress: Address) => {
  try {
    return getChannelMetadataController({ channelAddress })
  } catch (error) {
    return null
  }
}

export default async function ChannelPage({ params }: { params: Promise<{ address: Address }> }) {
  const { address: channelAddress } = await params

  // TODO: Make sure that user is authorized to view the channel

  return (
    <div className='grid gap-6 overflow-hidden md:grid-cols-[1fr,345px]'>
      <Suspense fallback={<ChannelPublicationsSkeleton />}>
        <Publications
          promisedChannelMetadata={getChannelMetadata(channelAddress)}
          promisedPublications={getPublications(channelAddress)}
          channelAddress={channelAddress}
        />
      </Suspense>

      <div className=''>
        <Suspense fallback={<SuggestedChannelsSkeleton />}>
          <SuggestedChannels className='fixed top-[116px] w-[345px]' />
        </Suspense>
      </div>
    </div>
  )
}
