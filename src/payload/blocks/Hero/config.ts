import { Block } from 'payload'

const HeroConfig: Block = {
  slug: 'Hero',
  interfaceName: 'HeroType',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  imageURL: '/images/blocks/HeroBlock.png',
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload the image to be displayed in the hero section.',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'Enter the main title for the hero section.',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      admin: {
        description: 'Enter a brief description for the hero section.',
      },
    },
  ],
}

export default HeroConfig
