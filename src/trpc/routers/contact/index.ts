import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { ContactFormValidator } from '@/payload/blocks/Contact/validators/contactValidator'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayload({ config: configPromise })
export const contactRouter = router({
  ContactFormPostData: publicProcedure
    .input(ContactFormValidator)
    .mutation(async ({ input }) => {
      const { email, message, name } = input
      try {
        await payload.create({
          collection: 'contacts',
          data: { email, message, name },
        })
        return { success: 'true' }
      } catch (error: any) {
        console.error(error)
        throw new Error(error.message)
      }
    }),
})
