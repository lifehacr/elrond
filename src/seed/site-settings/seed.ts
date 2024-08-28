import configPromise from '@payload-config'
import { SiteSetting } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { siteSettingsData, siteSettingsImageData } from './data'

type SiteSettingType = Omit<SiteSetting, 'id'>

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<SiteSetting> => {
  try {
    const headerLogoImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: siteSettingsImageData?.alt,
      },
      filePath: siteSettingsImageData?.filePath,
    })

    const { docs: pages } = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          in: ['authors', 'tags'],
        },
      },
    })

    console.log('pages', pages)

    const formattedSiteSettingsData: SiteSettingType = {
      ...siteSettingsData,
      logoImage: headerLogoImageResult?.id,
      header: {
        menuLinks: siteSettingsData?.header?.menuLinks?.map(
          (menuLinkItem, idx) => {
            return {
              ...menuLinkItem,
              menuLink: {
                ...menuLinkItem.menuLink,
                page: {
                  relationTo: 'pages',
                  value: pages?.at(idx)?.id as string,
                },
              },
            }
          },
        ),
      },
      footer: {
        links: siteSettingsData?.footer?.links?.map((linkItem, idx) => {
          return {
            ...linkItem,
            menuLink: {
              ...linkItem.menuLink,
              page: {
                relationTo: 'pages',
                value: pages?.at(idx)?.id as string,
              },
            },
          }
        }),
      },
    }

    console.log('formatted site settings', formattedSiteSettingsData)

    const result = await payload.updateGlobal({
      data: formattedSiteSettingsData,
      slug: 'site-settings',
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
