'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWriteFactoryRegister } from '@/generated'
import { useForm } from 'react-hook-form'
import { registerPublisherSchema } from '@/entities/schemas/registerPublisherSchema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { ContractFunctionExecutionError, ContractFunctionRevertedError, TransactionExecutionError } from 'viem'
import { useRouter } from 'next/navigation'
import { revalidateTag } from 'next/cache'

// export default function CreateChannelForm({ refetch }: { refetch: () => void }) {
export default function CreateChannelForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof registerPublisherSchema>>({
    resolver: zodResolver(registerPublisherSchema),
    defaultValues: {
      nftName: '',
      description: '',
    },
  })
  const { writeContractAsync } = useWriteFactoryRegister()

  async function onSubmit(values: z.infer<typeof registerPublisherSchema>) {
    try {
      setIsLoading(true)

      await writeContractAsync({ args: [values.nftName, values.description] })
      // TODO: add waiting mechanism client or server side to revalidate data

      toast({
        title: 'Success',
        description: 'You have successfully registered as a publisher.',
      })

      // revalidateTag('channels')
      router.push('/dashboard')
    } catch (error) {
      let description

      if (error instanceof ContractFunctionExecutionError) {
        if (error.cause instanceof ContractFunctionRevertedError) {
          description = error.cause.reason
        } else if (error.cause instanceof TransactionExecutionError) {
          description = error.cause.shortMessage
        } else {
          description = error.cause.message
        }
      }

      console.error(error)

      if (!description) {
        description = 'Something went wrong while creating Channel'
      }

      toast({
        variant: 'destructive',
        title: 'Error',
        description,
      })
    }

    setIsLoading(false)
  }

  return (
    <div className='mx-auto max-w-2xl rounded-lg p-4 shadow-lg dark:border'>
      <h2 className='text-lg font-semibold'>Create a Channel</h2>
      <p className='text-sm text-gray-600 dark:text-muted-foreground'>
        You need to create a channel to become a publisher and add articles to channel.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
          <FormField
            control={form.control}
            name='nftName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel Name</FormLabel>
                <FormControl>
                  <Input placeholder='Interesting Name' {...field} />
                </FormControl>
                <FormDescription>Name of the NFT collection.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Channel Description</FormLabel>
                <FormControl>
                  <Input placeholder='Attractive Description' {...field} />
                </FormControl>
                <FormDescription>Description of the NFT collection.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
