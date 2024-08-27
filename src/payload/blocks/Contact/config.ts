import { Block } from 'payload'

const ContactConfig: Block = {
  slug: 'Contact',
  // imageURL: '',
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
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload contact image',
      },
    },
  ],
}

export default ContactConfig
