import { Blog, User } from '@payload-types'

import AuthorPostsSkeleton from '@/components/skeletons/AuthorPostsSkeleton'

import AuthorHero from './AuthorHero'
import AuthorPosts from './AuthorPosts'

interface AuthorDetailsProps {
  blogsData: Blog[]
  author: User
  isLoading?: boolean
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({
  blogsData,
  author,
  isLoading,
}) => {
  return (
    <div>
      <AuthorHero author={author} />
      {isLoading ? (
        <AuthorPostsSkeleton />
      ) : (
        <AuthorPosts author={author} blogsData={blogsData} />
      )}
    </div>
  )
}

export default AuthorDetails
