'use client'

import { Blog, DetailsType, User } from '@payload-types'
import { Params } from '../types'

import PageNotFound from '@/components/404'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = async ({ params, ...block }) => {
  const payload = await getPayload({
    config: configPromise
  })

  switch (block?.collectionSlug) {
    case 'blogs': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs } = await payload.find({
        collection: 'blogs',
        draft: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      const { docs: blogsData } = await payload.find({
        collection: 'blogs',
        draft: false,
      })
      const blog = docs.at(0)

      return !!blog ? (
        <BlogDetails
          blog={blog as Blog}
          blogsData={blogsData as Blog[]}
        />
      ) : <PageNotFound/>
    }

    case 'tags': {
      const slug = params?.route?.at(-1) ?? ''

      const { docs: tagData } = await payload.find({
        collection: 'tags',
        where: {
          slug: {
            equals: slug,
          },
        },
      })
      const { docs: blogsData } = await payload.find({
        collection: 'blogs',
        where: {
          'tags.value': {
            contains: tagData?.at(0)?.id,
          },
        },
      })
      const tagDetails = (tagData || [])?.at(0)

      if (!tagDetails) {
        return <PageNotFound />
      }

      return (
        <TagDetails
          tagDetails={tagDetails}
          blogs={blogsData}
        />
      )
    }

    case 'users': {
      const authorName = params?.route?.at(-1) ?? ''
      const { docs: blogs } = await payload.find({
        collection: 'blogs',
        draft: false, // Optionally set draft filter
      })
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
