'use client'

import { Params } from '../types'
import { Blog, DetailsType, User } from '@payload-types'

import PageNotFound from '@/components/404'
import { trpc } from '@/trpc/client'

import AuthorDetails from './components/AuthorDetails'
import BlogDetails from './components/BlogDetails'
import TagDetails from './components/TagDetails'

interface DetailsProps extends DetailsType {
  params: Params
}

const Details: React.FC<DetailsProps> = ({ params, ...block }) => {
  switch (block?.collectionSlug) {
    case 'blogs': {
      const {
        data: blog,
        isPending: isBlogPending,
        isLoading,
        isError: isBlogError,
      } = trpc.blog.getBlogBySlug.useQuery({
        slug: params?.route.at(-1),
      })
      const { data: blogs } = trpc.blog.getAllBlogs.useQuery()
      if ((!blog && !isBlogPending) || isBlogError) {
        return <PageNotFound />
      }
      return (
        <BlogDetails
          blog={blog as Blog}
          blogsData={blogs as Blog[]}
          isLoading={isLoading}
        />
      )
    }

    case 'tags': {
      const {
        data: tagDataAndBlogsData,
        isLoading,
        isPending: isTagPending,
        isError: isTagError,
      } = trpc.tag.getTagBySlugAndItsBlogs.useQuery({
        tagSlug: params?.route.at(-1)!,
      })
      if ((!tagDataAndBlogsData?.tagData && !isTagPending) || isTagError) {
        return <PageNotFound />
      }
      const tagDetails = tagDataAndBlogsData?.tagData?.at(0)

      return (
        <TagDetails
          tagDetails={tagDetails}
          blogs={tagDataAndBlogsData?.blogsData}
          isLoading={isLoading}
        />
      )
    }

    case 'users': {
      const {
        data: author,
        isPending: isAuthorPending,
        isLoading,
        isError: isAuthorError,
      } = trpc.author.getAuthorByName.useQuery({
        authorName: params?.route.at(-1)!,
      })
      const { data: authorBlogs } = trpc.author.getBlogsByAuthorName.useQuery({
        authorName: params?.route.at(-1)!,
      })
      if ((!author && !isAuthorPending) || isAuthorError) {
        return <PageNotFound />
      }
      return (
        <AuthorDetails
          author={author as User}
          blogsData={authorBlogs as Blog[]}
          isLoading={isLoading}
        />
      )
    }
  }
}

export default Details
