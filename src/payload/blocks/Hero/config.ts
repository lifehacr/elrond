import { Block } from 'payload'

const HeroConfig: Block = {
  slug: 'Hero',
  // imageURL: '',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload hero image',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'description',
      type: 'text',
    },
  ],
}

export default HeroConfig
