import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { z } from 'zod'

import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const searchRouter = router({
  getBlogsBySearch: publicProcedure
    .input(
      z.object({
        searchParam: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { searchParam } = input
      try {
        const { docs: searchResult } = await payload.find({
          collection: 'search',
          where: {
            title: {
              contains: searchParam,
            },
          },
        })
        /*Here we get the title as a JSON string. 
          The attributes in the JSON change according to the collection. 
          For example, 
          for the user collection, it returns {"path":"/author/author-name","title":"author-name","image":"Media of image"}. */

        const formattedResult = searchResult?.map((result, idx) => {
          return { ...result, ...JSON.parse(result?.title as string) }
        })

        return formattedResult
      } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
      }
    }),
})
