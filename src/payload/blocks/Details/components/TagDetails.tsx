import { Hero } from '../../Hero'
import { Blog, Tag } from '@payload-types'

import TagPostsSkeleton from '@/components/skeletons/TagPostsSkeleton'

import TagPosts from './TagPosts'

interface TagDetailsProps {
  tagDetails: Tag | undefined
  blogs: Blog[] | undefined
  isLoading?: boolean
}
const TagDetails: React.FC<TagDetailsProps> = ({
  tagDetails,
  blogs,
  isLoading,
}) => {
  return (
    <div>
      <Hero
        title={tagDetails?.title}
        description={tagDetails?.description}
        image={tagDetails?.tagImage}
        blockType={'Hero'}
      />
      {isLoading ? (
        <TagPostsSkeleton />
      ) : (
        <TagPosts blogPosts={blogs as Blog[]} tagDetails={tagDetails} />
      )}
    </div>
  )
}

export default TagDetails
