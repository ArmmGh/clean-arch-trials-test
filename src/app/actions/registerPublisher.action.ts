// 'use server'

// import { InputParseError } from '@/entities/errors/common'
// import { registerPublisherController } from '@/interface-adapters/controllers/register-publisher.controller'

// export async function registerPublisherAction(formData: FormData) {
//   try {
//     const data = Object.fromEntries(formData)

//     await registerPublisherController(data)
//   } catch (error) {
//     if (error instanceof InputParseError) {
//       return { success: false, error: error.message }
//     }

//     return { success: false, error: 'An error occurred while registering the publisher' }
//   }

//   return { success: true, error: null }
//   // revalidatePath('/') TODO: do we need to revalidate?
// }
