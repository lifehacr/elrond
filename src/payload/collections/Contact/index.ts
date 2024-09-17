import type { CollectionConfig } from 'payload'

import { ContactEmailToUser } from './hooks/contactEmailToUser'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [ContactEmailToUser],
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ],
}
