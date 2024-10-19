// 'use client'

// import React, { useState } from 'react'
// import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import ArticleEditor from './ArticleEditor'

// export default function CreateArticleForm() {
//   const [step, setStep] = useState(1)
//   const methods = useForm({
//     defaultValues: {
//       content: '',
//       metadata: [{ key: '', value: '' }],
//     },
//   })
//   const { control, handleSubmit } = methods
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'metadata',
//   })

//   const nextStep = () => setStep((prev) => prev + 1)
//   const prevStep = () => setStep((prev) => prev - 1)

//   const onSubmit = (data) => {
//     console.log('Final submission data:', data)
//     // Minting logic here
//   }

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* Stepper UI */}
//         <div className='stepper flex gap-8'>
//           <Button className='rounded-full' onClick={() => setStep(1)} disabled={step === 1}>
//             Content
//           </Button>
//           <Button className='rounded-full' onClick={() => setStep(2)} disabled={step === 2}>
//             Metadata
//           </Button>
//           <Button className='rounded-full' onClick={() => setStep(3)} disabled={step === 3}>
//             Preview & Mint
//           </Button>
//         </div>

//         {/* Step 1: Content Creation */}
//         {step === 1 && (
//           <div className='step-content'>
//             <h2>Create Article Content</h2>
//             <ArticleEditor name='content' />
//             {/* onValueChange={field.onChange} value={field.value}  */}
//             {/* <TiptapEditor name='content' /> */}
//             <Button type='button' onClick={nextStep}>
//               Next: Add Metadata
//             </Button>
//           </div>
//         )}

//         {/* Step 2: Add Metadata */}
//         {step === 2 && (
//           <div className='step-metadata'>
//             <h2>Add Metadata</h2>
//             {fields.map((item, index) => (
//               <div key={item.id} className='metadata-field'>
//                 <Input placeholder='Key' {...methods.register(`metadata[${index}].key`)} />
//                 <Input placeholder='Value' {...methods.register(`metadata[${index}].value`)} />
//                 <Button type='button' onClick={() => remove(index)}>
//                   Remove
//                 </Button>
//               </div>
//             ))}
//             <Button type='button' onClick={() => append({ key: '', value: '' })}>
//               Add New Metadata Field
//             </Button>
//             <Button type='button' onClick={prevStep}>
//               Previous
//             </Button>
//             <Button type='button' onClick={nextStep}>
//               Next: Preview & Mint
//             </Button>
//           </div>
//         )}

//         {/* Step 3: Preview and Mint */}
//         {step === 3 && (
//           <div className='step-preview'>
//             <h2>Preview Your Article</h2>
//             <div className='preview-content'>
//               <h3>Content</h3>
//               <ArticleEditor value={methods.getValues('content')} />
//             </div>
//             <div className='preview-metadata'>
//               <h3>Metadata</h3>
//               {methods.getValues('metadata').map((meta, index) => (
//                 <div key={index}>
//                   <strong>{meta.key}</strong>: {meta.value}
//                 </div>
//               ))}
//             </div>
//             <Button type='button' onClick={prevStep}>
//               Previous
//             </Button>
//             <Button type='submit'>Mint Article</Button>
//           </div>
//         )}
//       </form>
//     </FormProvider>
//   )
// }

// // import { Form, FormControl } from '@/components/ui/form'
// // import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
// // import { zodResolver } from '@hookform/resolvers/zod'
// // import { Controller, useForm } from 'react-hook-form'
// // import { getAddress } from 'viem'
// // import { set, z } from 'zod'
// // import Channel from '@/components/channels/Channel'
// // import type { Channel as ChannelType } from '@/entities/models/channel'
// // import { useState } from 'react'
// // import ArticleEditor from './ArticleEditor'
// // import { Button } from '@/components/ui/button'
// // import draftArticleAction from '@/app/actions/draftArticle.action'
// // import { draftArticleSchema } from '@/entities/schemas/draftArticleSchema'
// // import { useToast } from '@/hooks/use-toast'
// // import { Loader2 } from 'lucide-react'

// // export default function CreateArticleForm() {
// //   const { toast } = useToast()
// //   const [isLoading, setIsLoading] = useState(false)
// //   // const [activeChannelAddress, setActiveChannelAddress] = useState<string | null>(null)

// //   // const form = useForm<z.infer<typeof draftArticleSchema>>({
// //   //   resolver: zodResolver(draftArticleSchema),
// //   //   defaultValues: {
// //   //     articleContent: '',
// //   //     channelAddress: '0x',
// //   //   },
// //   // })

// //   const onSubmit = async (values: z.infer<typeof draftArticleSchema>) => {
// //     setIsLoading(true)

// //     const { data, error: inputParseError } = draftArticleSchema.safeParse(values)

// //     if (inputParseError) {
// //       console.error('Error parsing input: ', inputParseError)
// //       return
// //     }

// //     const { isDrafted, error } = await draftArticleAction(data)

// //     if (isDrafted) {
// //       toast({
// //         title: 'Article Drafted!',
// //         description: 'Your article has been successfully drafted!',
// //       })
// //     } else {
// //       toast({
// //         variant: 'destructive',
// //         title: 'Article Draft Failed!',
// //         description: error,
// //       })
// //     }

// //     setIsLoading(false)
// //   }

// //   // const handleChannelClick = (channelAddress: string) => {
// //   //   const normalizedAddress = getAddress(channelAddress)
// //   //   setActiveChannelAddress(normalizedAddress)
// //   //   form.setValue('channelAddress', normalizedAddress)
// //   //   form.trigger('channelAddress')
// //   // }

// //   return (
// //     <Form {...form}>
// //       <form onSubmit={form.handleSubmit(onSubmit)}>
// //         <header className='mb-4 text-center text-2xl'>Choose Channel</header>

// //         <div className='flex flex-col gap-4'>
// //           <FormControl>
// //             <Controller
// //               render={({ field }) => <ArticleEditor onValueChange={field.onChange} value={field.value} />}
// //               name='articleContent'
// //             />
// //           </FormControl>

// //           <Button
// //             size={'lg'}
// //             disabled={!form.formState.isValid || isLoading}
// //             type='submit'
// //             className='w-full rounded-lg'
// //           >
// //             {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
// //             Save as Draft and proceed!
// //           </Button>
// //         </div>
// //       </form>
// //     </Form>
// //   )
// // }
