import Main from '@/components/layout/Main'
import { getPublisherAddressFromSession } from '@/lib/utils/getPublisherAddressFromSession'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import CreateChannelForm from './components/CreateChannelForm'

export default function CreateChannel() {
  const cookiesData = cookies()
  const publisherAddress = getPublisherAddressFromSession(cookiesData)
  if (!publisherAddress) redirect('/')

  return (
    <Main className='py-4'>
      <CreateChannelForm />
    </Main>
  )
}
