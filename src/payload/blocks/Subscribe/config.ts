import { Block } from 'payload'

const SubscribeConfig: Block = {
  slug: 'Subscribe',
  interfaceName: 'SubscribeType',
  labels: {
    singular: 'Subscribe Block',
    plural: 'Subscribe Blocks',
  },
  imageURL: '/images/blocks/SubscribeBlock.png',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'Enter the title for the subscribe section.',
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Upload an image to be displayed in the subscribe section.',
      },
    },
  ],
}

export default SubscribeConfig
