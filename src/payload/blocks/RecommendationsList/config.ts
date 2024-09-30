import { Block } from 'payload'

const RecommendationsListConfig: Block = {
  slug: 'RecommendationsList',
  // imageURL: '',
  interfaceName: 'RecommendationsListType',
  labels: {
    singular: 'RecommendationsList Block',
    plural: 'RecommendationsList Blocks',
  },
  fields: [
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            description: 'Upload recommendations image',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
        },
        {
          name: 'recommendationUrl',
          label: 'Recommendation URL',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default RecommendationsListConfig
