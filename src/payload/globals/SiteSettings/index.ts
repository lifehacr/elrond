import { revalidateTag } from 'next/cache'
import { Field, GlobalConfig } from 'payload'
import { z } from 'zod'

import { COLLECTION_SLUG_PAGE } from '@/payload/collections/constants'

// import iconField from '@/payload/fields/icon'

export const GLOBAL_SETTINGS_SLUG = 'site-settings'

const validateURL = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .url()

const menuItem: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'externalLink',
        type: 'checkbox',
        label: 'External Link',
        defaultValue: false,
        admin: {
          description: 'Other website link',
        },
      },
      {
        name: 'newPage',
        type: 'checkbox',
        label: 'New Page',
        defaultValue: false,
        admin: {
          condition: (_data, siblingData) => siblingData.externalLink,
          description: 'Open website in new-page',
        },
      },
    ],
  },
  {
    type: 'relationship',
    name: 'page',
    relationTo: [COLLECTION_SLUG_PAGE],
    admin: {
      condition: (_data, siblingData) => !siblingData.externalLink,
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Label',
        admin: {
          condition: (_data, siblingData) => siblingData.externalLink,
        },
      },
      {
        name: 'link',
        type: 'text',
        label: 'Link',
        admin: {
          condition: (_data, siblingData) => siblingData.externalLink,
        },
        validate: value => {
          const { success } = validateURL.safeParse(value)
          return success || 'Link is not valid'
        },
      },
    ],
  },
]

const menuGroupItem: Field = {
  type: 'group',
  name: 'menuLinkGroup',
  label: 'Link Group',
  fields: [
    {
      type: 'text',
      name: 'groupTitle',
      label: 'Group Title',
      required: true,
    },
    {
      type: 'array',
      name: 'groupLinks',
      label: 'Links',
      fields: menuItem,
    },
  ],
  admin: {
    condition: (_data, siblingData) => siblingData.group,
  },
}

const menuField: Field[] = [
  {
    type: 'checkbox',
    name: 'group',
    label: 'Group',
    defaultValue: false,
    admin: {
      description: 'Check to create group of links',
    },
  },
  {
    name: 'menuLink',
    type: 'group',
    label: 'Link',
    fields: menuItem,
    admin: {
      condition: (_data, siblingData) => !siblingData.group,
    },
  },
  menuGroupItem,
]

const logoField: Field[] = [
  {
    name: 'imageUrl',
    type: 'upload',
    required: true,
    relationTo: 'media',
    label: 'Image',
  },
  {
    type: 'row',
    fields: [
      {
        label: 'Height',
        name: 'height',
        type: 'number',
        admin: {
          description: 'Adjust to the height of the logo',
        },
      },
      {
        label: 'Width',
        name: 'width',
        type: 'number',
        admin: {
          description: 'Adjust to the width of the logo',
        },
      },
    ],
  },
]

const socialLinksField: Field = {
  type: 'row',
  fields: [
    {
      type: 'select',
      name: 'socialMedia',
      label: 'Social Media',
      required: true,
      options: [
        {
          label: 'Facebook',
          value: 'facebook',
        },
        {
          label: 'Twitter',
          value: 'twitter',
        },
        {
          label: 'GitHub',
          value: 'github',
        },
      ],
    },
    {
      type: 'text',
      name: 'socialMediaLink',
      label: 'Social Media Link',
      required: true,
      validate: (socialMediaLink, args) => {
        const { success } = validateURL.safeParse(socialMediaLink)
        // console.log({ success, operation }, success || 'Link is not valid')

        // return text(value, args)

        return success || 'Link is not valid'
      },
    },
  ],
}

export const siteSettings: GlobalConfig = {
  slug: GLOBAL_SETTINGS_SLUG,
  access: {
    read: () => true,
    // update: isAdmin,
  },
  hooks: {
    afterChange: [async () => revalidateTag('site-settings')],
  },
  fields: [
    {
      type: 'tabs',
      label: 'Settings',
      tabs: [
        {
          label: 'General',
          fields: [
            { type: 'text', name: 'appName' },
            { type: 'text', name: 'appDescription' },
            {
              name: 'logoImage',
              type: 'upload',
              required: true,
              relationTo: 'media',
              label: 'Logo Image',
              admin: {
                description: 'We recommend a maximum size of 256 * 256 pixels',
              },
            },
          ],
        },
        {
          name: 'header',
          fields: [
            {
              name: 'menuLinks',
              label: 'Menu Links',
              type: 'array',
              fields: menuField,
            },
          ],
        },
        {
          name: 'footer',
          fields: [
            {
              name: 'links',
              type: 'array',
              label: 'Links',
              fields: menuField,
            },
            {
              type: 'array',
              name: 'socialLinks',
              label: 'Social Links',
              fields: [socialLinksField],
            },
            { type: 'text', name: 'copyright', label: 'Copyright' },
          ],
        },
      ],
    },
  ],
}
