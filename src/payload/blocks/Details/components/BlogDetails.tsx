'use client'

import { Blog } from '@payload-types'


import BlogView from './BlogView'
import PostScrollBar from './PostScrollBar'

interface BlogDetailsProps {
  blog: Blog
  blogsData: Blog[]
}

const BlogDetails: React.FC<BlogDetailsProps> = ({
  blog,
  blogsData,
}) => {
  return (
    <div>
      <PostScrollBar blog={blog} />
      <BlogView blog={blog} />
    </div>
  )
}

export default BlogDetails
