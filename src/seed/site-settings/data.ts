import path from 'path'
import { SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  general: {
    title: 'Emerald Theme',
    description: 'Theme created by ContentQL team.',
    faviconUrl: '/public/favicon.ico',
    ogImageUrl: '',
  },
  navbar: {
    logo: {
      imageUrl: '/public/images/seed/home/logo.svg',
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
            value: '',
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
            value: '',
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
            value: '',
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
              label: 'Membership',
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
      imageUrl: '/images/seed/home/logo.svg',
    },
    footerLinks: [
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Features',
          page: { relationTo: 'pages', value: '' },
        },
      },
      {
        group: false,
        menuLink: {
          type: 'reference',
          label: 'Authors',
          page: { relationTo: 'pages', value: '' },
        },
      },
    ],
  },
}

export const siteSettingsImageData: ImageType = {
  alt: 'footer',
  filePath: path.join(process.cwd(), '/public/images/seed/home/logo.svg'),
}
