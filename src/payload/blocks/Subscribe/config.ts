import { Block } from 'payload'

const SubscribeConfig: Block = {
  slug: 'Subscribe',
  // imageURL: '',
  interfaceName: 'SubscribeType',
  labels: {
    singular: 'Subscribe Block',
    plural: 'Subscribe Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload subscribe image',
      },
    },
  ],
}

export default SubscribeConfig
