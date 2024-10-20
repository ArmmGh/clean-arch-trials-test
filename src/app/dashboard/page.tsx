import getPublisherAllChannelsAction from '@/app/actions/getPublisherAllChannels.action'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import DashboardChannels from './components/DashboardChannels'
import NoChannels from './components/NoChannels'

export default async function Dashboard() {
  const cookiesData = cookies()
  const publisherAddress = getPublisherAddressFromSession(cookiesData)
  const channels = await getPublisherAllChannelsAction({ publisherAddress })

  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden py-6'>
      {channels.length === 0 ? (
        <NoChannels />
      ) : (
        <>
          <h1 className='mb-4 px-4 text-xl font-bold'>My Channels</h1>
          <DashboardChannels addressFromCookie={publisherAddress} channels={channels} />
        </>
      )}
    </div>
  )
}
