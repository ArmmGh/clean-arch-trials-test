import { Address } from 'viem'
import { Separator } from '@/components/ui/separator'
import ArticleInteractions from '@/components/articles/article/article-interactions'
import getChannelMetadataController from '@/controllers/channels/get-channel-metadata.controller'
import PublicationDetailed from '@/components/publications/publication-detailed'
import getPublicationController from '@/controllers/publications/get-publication.controller'

const getPublication = async (channelAddress: Address, publicationIndex: string) => {
  try {
    return getPublicationController({ channelAddress, publicationIndex: BigInt(publicationIndex) })
  } catch (error) {
    console.log(error)

    return null
  }
}

const getChannelMetadata = async (channelAddress: Address) => {
  try {
    return getChannelMetadataController({ channelAddress })
  } catch (error) {
    return null
  }
}

export default async function PublicationPage({ params }: { params: Promise<{ index: Address; address: Address }> }) {
  const { index: publicationIndex, address: channelAddress } = await params

  const [publication, channelMetadata] = await Promise.all([
    getPublication(channelAddress, publicationIndex),
    getChannelMetadata(channelAddress),
  ])

  if (!publication) return <div>Publication not found</div>

  // Get Publication (with authorization if needed)

  return (
    <div className='space-y-4 py-5'>
      <PublicationDetailed {...publication} channelMetadata={channelMetadata} />
      <Separator className='bg-slate-300' />
      <ArticleInteractions />
    </div>
  )
}
