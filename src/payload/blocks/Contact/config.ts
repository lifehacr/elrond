import { Block } from 'payload'

const ContactConfig: Block = {
  slug: 'Contact',
  interfaceName: 'ContactType',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        description: 'Enter the title for the contact section.',
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      admin: {
        description:
          'Provide a brief description or message for the contact section.',
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload an image to be displayed in the contact section.',
      },
    },
  ],
}

export default ContactConfig
