import Main from '@/components/layout/Main'
import DashboardArticles from './components/DashboardArticles'

export default async function Dashboard() {
  return (
    <Main className='flex flex-col items-center'>
      <header>Dashboard</header>

      <DashboardArticles />
    </Main>
  )
}
