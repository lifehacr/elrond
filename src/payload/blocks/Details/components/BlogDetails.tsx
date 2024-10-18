'use client'

import { Blog } from '@payload-types'

import BlogDetailSkeleton from '@/components/skeletons/BlogDetailSkeleton'

import BlogView from './BlogView'
import PostScrollBar from './PostScrollBar'

interface BlogDetailsProps {
  blog: Blog
  blogsData: Blog[]
  isLoading: boolean
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  blog,
  blogsData,
  isLoading,
}) => {
  console.log('blog is ', blog)
  console.log('blogsData is ', blogsData)
  return (
    <div>
      <PostScrollBar blog={blog} />
      {isLoading ? <BlogDetailSkeleton /> : <BlogView blog={blog} />}
    </div>
  )
}

export default BlogDetails
