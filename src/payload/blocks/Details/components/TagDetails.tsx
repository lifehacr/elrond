import { Blog, Tag } from '@payload-types'
import { Hero } from '../../Hero'


import TagPosts from './TagPosts'

interface TagDetailsProps {
  tagDetails: Tag | undefined
  blogs: Blog[] | undefined
}
const TagDetails: React.FC<TagDetailsProps> = ({
  tagDetails,
  blogs,
}) => {
  return (
    <div>
      <Hero
        title={tagDetails?.title}
        description={tagDetails?.description}
        image={tagDetails?.tagImage}
        blockType={'Hero'}
      />
      <TagPosts blogPosts={blogs as Blog[]} tagDetails={tagDetails} />
    </div>
  )
}

export default TagDetails
