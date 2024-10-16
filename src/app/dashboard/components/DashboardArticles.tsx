'use client'

import { useAccount, useReadContract } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { getPublisherNfts } from '@/blockchain/actions/getPublisherNfts'
import { factoryAbi, factoryAddress, useReadFactoryGetUserErc721Address } from '@/generated'
import { zeroAddress } from 'viem'
import RegisterPublisherForm from '@/components/Dashboard/RegisterPublisherForm'
import { Loader2 } from 'lucide-react'
import NoArticles from './NoArticles'

export default function DashboardArticles() {
  const { address } = useAccount()

  const {
    data: nftAddress,
    isLoading: isLoadingNftAddress,
    refetch,
  } = useReadFactoryGetUserErc721Address({
    args: [address!],
    query: { enabled: !!address, select: (data) => (data === zeroAddress ? undefined : data), staleTime: 30000 },
  })

  const { data: nfts = [], isLoading: isLoadingNfts } = useQuery({
    queryKey: ['publisher-nfts', address],
    queryFn: () => getPublisherNfts({ address, nftAddress }),
    enabled: !!address && !!nftAddress,
    staleTime: Infinity,
  })

  if (isLoadingNftAddress || isLoadingNfts) return <Loader2 className='animate-spin self-center' />

  if (!nftAddress) return <RegisterPublisherForm refetch={refetch} />

  return (
    <div className='flex flex-col items-center justify-center gap-8'>
      <header>My Nft Address {nftAddress} </header>

      {nfts.length > 0 ? (
        <div>
          {/* <Articles nfts={nfts} /> */}
          {nfts.map((nft, index) => (
            <div key={index}>{nft}</div>
          ))}
        </div>
      ) : (
        <NoArticles />
      )}
    </div>
  )
}
