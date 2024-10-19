// 'use client'

// import { useAccount } from 'wagmi'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'

// export default function DashboardArticles() {
//   const { address } = useAccount()
//   const router = useRouter()

//   // const {
//   //   data: nftAddress,
//   //   isLoading: isLoadingNftAddress,
//   //   refetch,
//   // } = useReadFactoryGetUserErc721Address({
//   //   args: [address!],
//   //   query: { enabled: !!address, select: (data) => (data === zeroAddress ? undefined : data), staleTime: 30000 },
//   // })

//   // const { data: nfts = [], isLoading: isLoadingNfts } = useQuery({
//   //   queryKey: ['publisher-nfts', address],
//   //   queryFn: () => getPublisherNfts({ address, nftAddress }),
//   //   enabled: !!address && !!nftAddress,
//   //   staleTime: Infinity,
//   // })

//   // if (isLoadingNftAddress || isLoadingNfts) return <Loader2 className='animate-spin self-center' />

//   // if (!nftAddress) return <RegisterPublisherForm refetch={refetch} />

//   useEffect(() => {
//     if (address) return

//     router.replace('/')
//   }, [address, router])

//   return (
//     <div className='flex flex-col items-center justify-center gap-8'>
//       {/* <header>My Nft Address {nftAddress} </header> */}

//       {/* {nfts.length > 0 ? (
//         <div>
//           <Articles nfts={nfts} />
//           {nfts.map((nft, index) => (
//             <div key={index}>{nft}</div>
//           ))}
//         </div>
//       ) : (
//         <NoArticles />
//       )} */}
//     </div>
//   )
// }
