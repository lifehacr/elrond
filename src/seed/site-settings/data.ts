import path from 'path'
import { SiteSetting } from 'payload-types'

export type siteSettingsDataType = Omit<SiteSetting, 'id'>

export type ImageType = {
  alt: string
  filePath: string
}

export const siteSettingsData: siteSettingsDataType = {
  appName: 'Emerald Theme',
  appDescription: 'Theme created by contentQL team.',
  logoImage: '',
  header: {
    menuLinks: [
      {
        group: false,
        menuLink: {
          externalLink: false,
          page: { relationTo: 'pages', value: '' },
        },
      },
      {
        group: false,
        menuLink: {
          externalLink: false,
          page: { relationTo: 'pages', value: '' },
        },
      },
    ],
  },

  footer: {
    links: [
      {
        group: false,
        menuLink: {
          externalLink: false,
          page: { relationTo: 'pages', value: '' },
        },
      },
      {
        group: false,
        menuLink: {
          externalLink: false,
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
