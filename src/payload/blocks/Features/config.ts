import { Block } from 'payload'

const FeaturesConfig: Block = {
  slug: 'Features',
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
      admin: {
        description: 'Add the main features with points to highlight.',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            description: 'Enter the title of the feature.',
          },
        },
        {
          name: 'points',
          label: 'Points',
          type: 'array',
          admin: {
            description: 'Add specific points or benefits under this feature.',
          },
          fields: [
            {
              name: 'point',
              label: 'Point',
              type: 'text',
              admin: {
                description: 'Enter the description of the point.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default FeaturesConfig
