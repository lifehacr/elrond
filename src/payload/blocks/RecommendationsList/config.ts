import { Block } from 'payload'

const RecommendationsListConfig: Block = {
  slug: 'RecommendationsList',
  interfaceName: 'RecommendationsListType',
  labels: {
    singular: 'Recommendations List Block',
    plural: 'Recommendations List Blocks',
  },
  imageURL: '/images/blocks/RecommendationsBlock.png',
  fields: [
    {
      name: 'recommendations',
      label: 'Recommendations',
      type: 'array',
      admin: {
        description: 'Add a list of recommendations to display.',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            description: 'Upload an image to represent the recommendation.',
          },
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter the title of the recommendation.',
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
          admin: {
            description: 'Provide a brief description for the recommendation.',
          },
        },
        {
          name: 'recommendationUrl',
          label: 'Recommendation URL',
          type: 'text',
          required: true,
          admin: {
            description:
              'Enter the URL for more information about the recommendation.',
          },
        },
      ],
    },
  ],
}

export default RecommendationsListConfig
