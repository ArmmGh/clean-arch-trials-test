import { columns } from '@/components/admin/columns'
import { DataTable } from '@/components/admin/data-table'
import Main from '@/components/layout/Main'
import getChannelRequestsForAdminController from '@/controllers/get-channel-requests-for-admin.controller'
import { Suspense } from 'react'

export default async function AdminPage() {
  const channels = await getChannelRequestsForAdminController()

  return (
    <div>
      <Main className='px-4 py-4'>
        <h1>Channel Requests</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <DataTable data={channels} columns={columns} />
        </Suspense>
      </Main>
    </div>
  )
}
