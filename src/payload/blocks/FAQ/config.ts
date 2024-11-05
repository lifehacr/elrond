import { Block } from 'payload'

const FAQConfig: Block = {
  slug: 'FAQ',
  interfaceName: 'FAQType',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  imageURL: '/images/blocks/FAQBlock.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'Enter the main title for the FAQ section.',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      admin: {
        description:
          'Provide a brief description or introduction for the FAQ section (optional).',
      },
    },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      admin: {
        description:
          'Add frequently asked questions with their corresponding answers.',
      },
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
          admin: {
            description: 'Enter the question.',
          },
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'text',
          admin: {
            description: 'Provide the answer for the corresponding question.',
          },
        },
      ],
    },
  ],
}

export default FAQConfig
