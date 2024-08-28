import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'

import { seedAuthorDetailsPage } from '@/seed/author-details-page'
import { seedAuthors } from '@/seed/authors'
import { seedAuthorsPage } from '@/seed/authors-page'
import { seedBlogDetailsPage } from '@/seed/blog-details-page'
import { seedBlogs } from '@/seed/blogs'
import { seedFeaturePage } from '@/seed/features'
import { seedHomePage } from '@/seed/home-page'
import { seedSiteSetting } from '@/seed/site-settings'
import { seedTagDetailsPage } from '@/seed/tag-details-page'
import { seedTags } from '@/seed/tags'
import { seedTagsPage } from '@/seed/tags-page'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    try {
      // Ensure that the seeding functions are called in the correct order.
      // The blogs seeding depends on tags and authors being seeded first.
      // Therefore, make sure to seed tags and authors before seeding blogs.
      console.log('seeding staretd...')
      await seedTagsPage()
      await seedTags() // Seed tags first
      await seedTagDetailsPage()
      console.log('seeding tags completed')
      await seedAuthors() // Then seed authors
      await seedAuthorsPage()
      await seedAuthorDetailsPage()
      console.log('seeding authors completed')
      await seedBlogs() // Finally, seed blogs, which depend on tags and authors
      await seedBlogDetailsPage()
      console.log('seeding blogs completed')

      await seedHomePage()
      console.log('seeding homepage completed')
      await seedFeaturePage()
      console.log('seeding feature completed')
      await seedSiteSetting()
      console.log('seeding site seeting completed')
      console.log('seeding completed!!')
      // await seedBlogsPage()

      return { success: true }
    } catch (error: any) {
      console.error('Error seeding:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      })
    }
  }),
})
