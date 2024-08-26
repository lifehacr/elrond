import { Block } from 'payload'

const FeaturesConfig: Block = {
  slug: 'Features',
  // imageURL: '',
  interfaceName: 'FeaturesType',
  labels: {
    singular: 'Features Block',
    plural: 'Features Blocks',
  },
  fields: [
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'points',
          label: 'Points',
          type: 'array',
          fields: [
            {
              name: 'point',
              label: 'Point',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}

export default FeaturesConfig
