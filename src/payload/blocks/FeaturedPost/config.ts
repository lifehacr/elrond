import { Block } from 'payload'

const FeaturedPostConfig: Block = {
  slug: 'FeaturedPost',
  interfaceName: 'FeaturedPostType',
  labels: {
    singular: 'Featured Post Block',
    plural: 'Featured Post Blocks',
  },
  imageURL: '/images/blocks/FeaturedPost.png',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'Enter the title of the featured post.',
      },
    },
  ],
}

export default FeaturedPostConfig
