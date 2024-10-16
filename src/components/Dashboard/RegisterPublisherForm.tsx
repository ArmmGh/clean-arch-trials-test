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

export default function RegisterPublisherForm({ refetch }: { refetch: () => void }) {
  const { toast } = useToast()
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

      toast({
        title: 'Success',
        description: 'You have successfully registered as a publisher.',
      })

      refetch()
    } catch (error) {
      console.dir(error)

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

      if (!description) {
        description = 'Something went wrong while registering as a publisher.'
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
    <div className='mx-auto max-w-2xl rounded-lg p-4 shadow-lg'>
      <h2 className='text-lg font-semibold'>Register as publisher</h2>
      <p className='text-sm text-gray-600'>You need to register as a publisher to create articles.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
          <FormField
            control={form.control}
            name='nftName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Collection Name</FormLabel>
                <FormControl>
                  <Input placeholder='My Interesting name' {...field} />
                </FormControl>
                <FormDescription>
                  This is the name of the NFT collection you want to publish articles under.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>NFT Description</FormLabel>
                <FormControl>
                  <Input placeholder='My pretty description' {...field} />
                </FormControl>
                <FormDescription>
                  This is the description of the NFT collection you want to publish articles under.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={isLoading}>
            {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />} Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
