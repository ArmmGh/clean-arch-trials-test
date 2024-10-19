import Channels from '@/components/channels/Channels'
import getAllChannelsAction from './actions/getAllChannels.action'

// TODO: maybe worth to check?
// const getAllChannels = unstable_cache(
//   async () => getAllChannelsAction(),
//   ['channels'],
//   { tags: ['channels'] }, //revalidate: 3600,
// )
export default async function App() {
  // const channels = await getAllChannelsAction()
  const channels = await getAllChannelsAction()

  // revalidatePath('/')

  return (
    <div className='mx-auto flex w-full max-w-screen-xl flex-1 flex-col overflow-hidden py-6'>
      <h1 className='mb-4 px-4 text-xl font-bold'>Global Channels</h1>

      <Channels channels={channels} />
    </div>
  )
}
