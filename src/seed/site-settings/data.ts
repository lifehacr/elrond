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
    currency: 'usd',
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
  themeSettings: {
    lightMode: {
      primary: '#C62E2E',
      background: '#FEF3E2',
      text: '#1A1A19',
      foreground: '#FBD288',
      popover: '#000000',
      border: '#CDC2A5',
    },

    darkMode: {
      primary: '#F15A59',
      background: '#191919',
      text: '#FFFAFA',
      foreground: '#F8C4B4',
      popover: '#000000',
      border: '#323232',
    },

    fonts: {
      display: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap',
        fontName: 'Finger Paint',
      },

      body: {
        type: 'googleFont',
        customFont: null,
        remoteFont:
          'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
        fontName: 'Work Sans',
      },
    },

    radius: 'medium',
  },
}

export const siteSettingsImageData: ImageType = {
  alt: 'footer',
  filePath: path.join(process.cwd(), '/public/images/seed/home/logo.svg'),
}
