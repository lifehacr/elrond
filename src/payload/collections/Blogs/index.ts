import { slateEditor } from '@payloadcms/richtext-slate'
import type { CollectionConfig } from 'payload'

import { slugField } from '@/payload/fields'

import { assignUserId } from './field-level-hooks/assignUserId'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      label: 'Author',
      relationTo: ['users'],
      hasMany: true,
      hooks: {
        beforeChange: [assignUserId],
      },
      filterOptions: ({ relationTo, data }) => {
        if (relationTo === 'users') {
          return {
            role: {
              equals: 'author',
            },
          }
        } else {
          return false
        }
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'relationship',
      relationTo: ['tags'],
      hasMany: true,
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
      name: 'blogImage',
      label: 'Blog Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'upload blog image',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      editor: slateEditor({}),
      admin: {
        description:
          'Main content of the blog post. Use the rich text editor for formatting.',
      },
    },
    slugField(),
  ],
}
