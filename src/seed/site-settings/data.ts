import path from 'path'
import { Media, Page, SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Emerald Theme',
    description: 'Theme created by ContentQL team.',
    faviconUrl: '/public/favicon.ico' as unknown as number | Media,
    ogImageUrl: '' as unknown as number | Media,
  },
  navbar: {
    logo: {
      imageUrl: '/public/images/seed/home/logo.svg' as unknown as
        | number
        | Media,
      description: 'Emerald Theme',
      height: 24,
      width: 24,
    },
    menuLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Features',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Membership',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Authors',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Tags',
          page: {
            relationTo: 'pages',
            value: '' as unknown as number | Page,
          },
        },
      },
      {
        group: true,
        menuLinkGroup: {
          groupTitle: 'More',
          groupLinks: [
            {
              type: 'reference',
              newTab: false,
              label: 'Subscribe',
            },
            {
              type: 'reference',
              newTab: false,
              label: 'Contact',
            },
            {
              type: 'reference',
              newTab: false,
              label: 'Recommendations',
            },
          ],
        },
      },
    ],
  },
  footer: {
    logo: {
      imageUrl: '/images/seed/home/logo.svg' as unknown as number | Media,
    },
    footerLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Features',
          page: { relationTo: 'pages', value: '' as unknown as number | Page },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Authors',
          page: { relationTo: 'pages', value: '' as unknown as number | Page },
        },
      },
    ],
  },
}

export const siteSettingsImageData: ImageType = {
  alt: 'footer',
  filePath: path.join(process.cwd(), '/public/images/seed/home/logo.svg'),
}
