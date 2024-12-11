import { Params } from '../types'
import configPromise from '@payload-config'
import { Blog, DetailsType, User } from '@payload-types'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import PageNotFound from '@/components/404'

import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise,
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            draft: false,
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'blogs', slug],
        { tags: [`details-blogs-${slug}`] },
      )()
      const blog = docs.at(0)

      return !!blog ? <BlogDetails blog={blog as Blog} /> : <PageNotFound />
    }

    case 'tags': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs: tagData } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'tags',
            where: {
              slug: {
                equals: slug,
              },
            },
          }),
        ['details', 'tags', slug],
        { tags: [`details-tags-${slug}`] },
      )()
      const tagDetails = (tagData || [])?.at(0)

      if (!tagDetails) {
        return <PageNotFound />
      }

      const { docs: blogsData } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            where: {
              'tags.value': {
                contains: tagData?.at(0)?.id,
              },
            },
          }),
        ['details', 'blogs-by-tags', slug],
        { tags: [`details-blogs-by-tags-${slug}`] },
      )()

      return <TagDetails tagDetails={tagDetails} blogs={blogsData} />
    }

    case 'users': {
      const authorName = params?.route?.at(-1) ?? ''

      const { docs: blogs } = await unstable_cache(
        async () =>
          await payload.find({
            collection: 'blogs',
            draft: false, // Optionally set draft filter
          }),
        ['details', 'author', authorName],
        { tags: [`details-author-${authorName}`] },
      )()
      const blogsRelatedWithAuthor = blogs.filter(blog => {
        return blog.author?.find(
          blogAuthor => (blogAuthor.value as User).username === authorName,
        )
      })

      const author = Array.isArray(blogsRelatedWithAuthor?.[0]?.author)
        ? blogsRelatedWithAuthor?.[0]?.author.filter(({ value }) => {
            return (
              typeof value === 'object' &&
              value.username === params?.route?.at(-1)!
            )
          })[0]?.value
        : undefined

      if (typeof author === 'object') {
        return (
          <AuthorDetails
            author={author as User}
            blogsData={blogsRelatedWithAuthor as Blog[]}
          />
        )
      }
    }
  }
}

export default Details
