import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import ora from 'ora'

import { seedAuthorDetailsPage } from '@/seed/author-details-page'
import { seedAuthors } from '@/seed/authors'
import { seedAuthorsPage } from '@/seed/authors-page'
import { seedBlogDetailsPage } from '@/seed/blog-details-page'
import { seedBlogs } from '@/seed/blogs'
import { seedBlogsPage } from '@/seed/blogs-page'
// import { seedContactPage } from '@/seed/contact';
import { seedContactPage } from '@/seed/contact-page'
import { seedFeaturePage } from '@/seed/features'
import { seedForm } from '@/seed/forms'
import { seedHomePage } from '@/seed/home-page'
import { seedMembershipPage } from '@/seed/membership'
import { seedRecommendations } from '@/seed/recommendations'
import { seedSiteSetting } from '@/seed/site-settings'
import { seedSubscriptionPage } from '@/seed/subscription'
import { seedTagDetailsPage } from '@/seed/tag-details-page'
import { seedTags } from '@/seed/tags'
import { seedTagsPage } from '@/seed/tags-page'
import { publicProcedure, router } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const seedRouter = router({
  runSeed: publicProcedure.mutation(async () => {
    const spinner = ora({
      text: 'Starting the seeding process...',
      color: 'cyan',
      spinner: 'dots',
    }).start()

    try {
      // Ensure that the seeding functions are called in the correct order.
      // The blogs seeding depends on tags and authors being seeded first.
      // Therefore, make sure to seed tags and authors before seeding blogs.
      const pages = await payload.count({
        collection: 'pages',
      })

      if (pages.totalDocs > 1) {
        return
      }

      console.log('seeding staretd...')
      const tagsPage = await seedTagsPage(spinner)
      const tags = await seedTags(spinner)
      const tagsDetailsPage = await seedTagDetailsPage({
        spinner,
        id: tagsPage.id,
      })

      const forms = await seedForm(spinner)
      const authors = await seedAuthors(spinner)
      const authorsPage = await seedAuthorsPage(spinner)
      const authorDetailsPage = await seedAuthorDetailsPage({
        spinner,
        id: authorsPage.id,
      })

      await seedBlogs({ spinner, tags, authors })
      const blogsPage = await seedBlogsPage({ spinner })
      const blogsDetailsPage = await seedBlogDetailsPage({
        spinner,
        id: blogsPage.id,
      })

      await seedHomePage(spinner)

      const featuresPage = await seedFeaturePage(spinner)

      const recommendationPage = await seedRecommendations(spinner)

      // const contactPage = await seedContactPage(spinner)

      const membershipPage = await seedMembershipPage(spinner)

      const subscriptionPage = await seedSubscriptionPage(spinner)

      const contactPage = await seedContactPage({ spinner, forms })

      await seedSiteSetting({
        featuresPages: featuresPage,
        spinner,
        authorsPages: authorsPage,
        tagsPages: tagsPage,
        subscribePages: subscriptionPage,
        membershipPages: membershipPage,
        contactPages: contactPage,
        recommendationPages: recommendationPage,
        tagsDetailsPages: tagsDetailsPage,
        authorsDetailsPages: authorDetailsPage,
        blogsDetailsPages: blogsDetailsPage,
      })

      console.log('seeding completed!!')

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
