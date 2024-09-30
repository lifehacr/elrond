import { collectionSlug } from '@contentql/core'
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
  globalSearch: publicProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { search } = input
      try {
        const { docs: searchResult } = await payload.find({
          collection: collectionSlug['search'],
          where: {
            title: {
              contains: search,
            },
          },
        })
        /* Here we get the title as a JSON string. 
          The attributes in the JSON change according to the collection. 
          For example, 
          for the user collection, it returns {"path":"author-name","title":"author-name","image":"Media of image", "category": "authors"}. */

        const formattedResult = searchResult?.map((result, idx) => {
          console.log({ result })

          const parsedValues =
            typeof result.title === 'string' ? JSON.parse(result.title) : result

          return { ...result, parsedValues }
        })

        return formattedResult
      } catch (error: unknown) {
        console.log(error)

        if (error instanceof Error) {
          throw new Error(error.message)
        }

        throw new Error('Failed to search')
      }
    }),
})
