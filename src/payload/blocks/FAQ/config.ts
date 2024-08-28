import { Block } from 'payload'

const FAQConfig: Block = {
  slug: 'FAQ',
  interfaceName: 'FAQType',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'question',
          label: 'Question',
          type: 'text',
        },
        {
          name: 'answer',
          label: 'Answer',
          type: 'text',
        },
      ],
    },
  ],
}

export default FAQConfig
