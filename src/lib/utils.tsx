import { toast } from '@/hooks/use-toast'
import { type ClassValue, clsx } from 'clsx'
import { differenceInSeconds, format, formatDistanceToNow, secondsToMilliseconds } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const readFileAsUint8Array = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result instanceof ArrayBuffer) {
        resolve(new Uint8Array(e.target.result))
      } else {
        reject(new Error('Failed to read file as Uint8Array'))
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

export function base64ToJson<T>(base64Data: string): T {
  const base64String = base64Data.split(',')[1]

  // Step 2: Decode the base64 string using Buffer
  const decodedString = Buffer.from(base64String, 'base64').toString('utf-8')

  // Step 3: Parse the decoded string into a JSON object
  const jsonObject = JSON.parse(decodedString)

  return jsonObject
}

export enum GATEWAYS {
  LOCAL = 'local',
  PUBLIC = 'public',
}

export function gatewayedIpfsUrl(url: string, gateway = GATEWAYS.PUBLIC): string {
  const gatewayToUse =
    gateway === GATEWAYS.LOCAL
      ? process.env.NEXT_PUBLIC_IPFS_LOCAL_GATEWAY
      : process.env.NEXT_PUBLIC_IPFS_PUBLIC_GATEWAY

  return url.replace('ipfs://', gatewayToUse!)
}

export function replaceAllUrlsToGateway(url: string, gateway = GATEWAYS.PUBLIC): string {
  const gatewayToUse =
    gateway === GATEWAYS.LOCAL
      ? process.env.NEXT_PUBLIC_IPFS_LOCAL_GATEWAY
      : process.env.NEXT_PUBLIC_IPFS_PUBLIC_GATEWAY

  const regex = new RegExp('ipfs://(\\w+)', 'g')
  return url.replace(regex, `${gatewayToUse}$1`!)
}

export function humanizeTimestamp(timestamp: any, formatStr = 'MMMM d, yyyy') {
  const formattedTimestamp = typeof timestamp === 'number' ? timestamp : Number(timestamp)
  const date = new Date(secondsToMilliseconds(formattedTimestamp))

  return format(date, formatStr)
}

export function prepareImagesGateway(content: string): string {
  const regex = new RegExp(`${process.env.NEXT_PUBLIC_IPFS_LOCAL_GATEWAY}(\\w+)`, 'g')
  const newContent = content.replace(regex, 'ipfs://$1')

  return newContent
}

export function openWaitingToast(
  title = 'Transaction Confirmation',
  description = 'Wait for transaction confirmation!',
) {
  toast({
    title,
    description: (
      <div className='flex gap-2'>
        <Loader2 className='h-5 w-5 animate-spin' /> {description}
      </div>
    ),
    duration: 24_500,
  })
}

export function openStatusToast(error: boolean = false) {
  if (error) {
    toast({
      title: 'Error!',
      variant: 'destructive',
    })
  } else {
    toast({
      title: 'Success!',
      variant: 'success',
    })
  }
}

export const getTimeAgo = (date: Date) => {
  const diff = differenceInSeconds(new Date(), date)
  if (diff < 30) {
    return 'now'
  } else {
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
  }
}

export const getTimeAgoFromTimestamp = (timestamp: number | string) => {
  const formattedTimestamp = typeof timestamp === 'number' ? timestamp : Number(timestamp)
  const formattedDate = new Date(secondsToMilliseconds(formattedTimestamp))

  return getTimeAgo(formattedDate)
}
