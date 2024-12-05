import { Blog, User } from '@payload-types'


import AuthorHero from './AuthorHero'
import AuthorPosts from './AuthorPosts'

interface AuthorDetailsProps {
  blogsData: Blog[]
  author: User
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({
  blogsData,
  author,
}) => {
  return (
    <div>
      <AuthorHero author={author} />
      <AuthorPosts author={author} blogsData={blogsData} />
    </div>
  )
}

export default AuthorDetails
