import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import {
  siteSettingsData,
  siteSettingsDataType,
  siteSettingsImageData,
} from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seedSiteSettings = async () => {
  console.log('site settings data is ', siteSettingsData?.navbar?.menuLinks)
  try {
    const logoImageResult = await payload.create({
      collection: 'media',
      data: {
        alt: siteSettingsImageData?.alt,
      },
      filePath: siteSettingsImageData?.filePath,
    })

    const { docs: pages } = await payload.find({
      collection: 'pages',
    })

    const formattedSiteSettingsData: siteSettingsDataType = {
      ...siteSettingsData,
      general: {
        ...siteSettingsData.general,
        faviconUrl: logoImageResult?.id,
        ogImageUrl: logoImageResult?.id,
      },
      navbar: {
        ...siteSettingsData.navbar,
        logo: {
          ...siteSettingsData?.navbar?.logo,
          imageUrl: logoImageResult?.id,
        },
        menuLinks: siteSettingsData?.navbar?.menuLinks?.map((link, index) => {
          if (link.group && link.menuLinkGroup) {
            return {
              group: true,
              menuLinkGroup: {
                ...link.menuLinkGroup,
                groupLinks: link?.menuLinkGroup?.groupLinks?.map(
                  (groupLink, groupIndex) => {
                    const currentPage = pages?.at(index + groupIndex)
                    return {
                      ...groupLink,
                      page: currentPage
                        ? {
                            relationTo: 'pages',
                            value: currentPage.id,
                          }
                        : undefined,
                    }
                  },
                ),
              },
            }
          } else if (!link.group && link.menuLink) {
            const currentPage = pages?.at(index)
            return {
              group: false,
              menuLink: {
                ...link.menuLink,
                label: currentPage?.title || '',
                page: currentPage
                  ? {
                      relationTo: 'pages',
                      value: currentPage.id,
                    }
                  : undefined,
              },
            }
          }
          return link
        }),
      },
      footer: {
        ...siteSettingsData?.footer,
        logo: {
          ...siteSettingsData?.footer?.logo,
          imageUrl: logoImageResult?.id,
        },
        footerLinks: siteSettingsData?.footer?.footerLinks?.map(
          (page, index) => {
            const currentPage = pages?.at(index)
            return {
              ...page,
              menuLink: {
                ...page?.menuLink,
                label: currentPage?.title || '',
                page: currentPage
                  ? {
                      relationTo: 'pages',
                      value: currentPage?.id,
                    }
                  : undefined,
              },
            }
          },
        ),
      },
    }

    console.log(
      'formatted site settings ',
      formattedSiteSettingsData?.navbar?.menuLinks,
    )

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: formattedSiteSettingsData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seedSiteSettings
