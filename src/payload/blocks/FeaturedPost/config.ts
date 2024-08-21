import { Block } from 'payload'

const FeaturedPostConfig: Block = {
  slug: 'FeaturedPost',
  // imageURL: '',
  interfaceName: 'FeaturedPostType',
  labels: {
    singular: 'FeaturedPost Block',
    plural: 'FeaturedPost Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
  ],
}

export default FeaturedPostConfig
