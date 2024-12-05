import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { Ora } from 'ora'
import path from 'path'

const payload = await getPayload({ config: configPromise })

const seedSiteSettings = async ({
  spinner,
  featuresPages,
  authorsPages,
  tagsPages,
  subscribePages,
  membershipPages,
  contactPages,
  recommendationPages,
  tagsDetailsPages,
  authorsDetailsPages,
  blogsDetailsPages,
}: {
  spinner: Ora
  featuresPages: Page
  authorsPages: Page
  tagsPages: Page
  subscribePages: Page
  membershipPages: Page
  contactPages: Page
  recommendationPages: Page
  tagsDetailsPages: Page
  authorsDetailsPages: Page
  blogsDetailsPages: Page
}) => {
  spinner.start(`Started created site-settings...`)
  try {
    const ogImageUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(process.cwd(), '/public/images/seed/home/logo.svg'),
    })

    const faviconUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'favicon',
      },
      filePath: path.join(process.cwd(), '/public/favicon.ico'),
    })

    const { docs: pages } = await payload.find({
      collection: 'pages',
    })

    // const formattedSiteSettingsData: siteSettingsDataType = {
    //   ...siteSettingsData,
    //   general: {
    //     ...siteSettingsData.general,
    //     faviconUrl: logoImageResult?.id,
    //     ogImageUrl: logoImageResult?.id,
    //   },
    //   navbar: {
    //     ...siteSettingsData.navbar,
    //     logo: {
    //       ...siteSettingsData?.navbar?.logo,
    //       imageUrl: logoImageResult?.id,
    //     },
    //     menuLinks: siteSettingsData?.navbar?.menuLinks?.map((link, index) => {
    //       if (link.group && link.menuLinkGroup) {
    //         return {
    //           group: true,
    //           menuLinkGroup: {
    //             ...link.menuLinkGroup,
    //             groupLinks: link?.menuLinkGroup?.groupLinks?.map(
    //               (groupLink, groupIndex) => {
    //                 const currentPage = pages?.at(index + groupIndex)
    //                 return {
    //                   ...groupLink,
    //                   page: currentPage
    //                     ? {
    //                         relationTo: 'pages',
    //                         value: currentPage.id,
    //                       }
    //                     : undefined,
    //                 }
    //               },
    //             ),
    //           },
    //         }
    //       } else if (!link.group && link.menuLink) {
    //         const currentPage = pages?.at(index)
    //         return {
    //           group: false,
    //           menuLink: {
    //             ...link.menuLink,
    //             label: currentPage?.title || '',
    //             page: currentPage
    //               ? {
    //                   relationTo: 'pages',
    //                   value: currentPage.id,
    //                 }
    //               : undefined,
    //           },
    //         }
    //       }
    //       return link
    //     }),
    //   },
    //   footer: {
    //     ...siteSettingsData?.footer,
    //     logo: {
    //       ...siteSettingsData?.footer?.logo,
    //       imageUrl: logoImageResult?.id,
    //     },
    //     footerLinks: siteSettingsData?.footer?.footerLinks?.map(
    //       (page, index) => {
    //         const currentPage = pages?.at(index)
    //         return {
    //           ...page,
    //           menuLink: {
    //             ...page?.menuLink,
    //             label: currentPage?.title || '',
    //             page: currentPage
    //               ? {
    //                   relationTo: 'pages',
    //                   value: currentPage?.id,
    //                 }
    //               : undefined,
    //           },
    //         }
    //       },
    //     ),
    //   },
    // }

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: {
        general: {
          title: 'Emerald Theme',
          description: 'Theme created by ContentQL team.',
          faviconUrl: faviconUrl.id,
          ogImageUrl: ogImageUrl.id,
        },
        navbar: {
          logo: {
            imageUrl: ogImageUrl.id,
            description: 'Emerald Logo',
            height: 24,
            width: 24,
          },
          menuLinks: [
            /** Features */
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Features',
                page: {
                  relationTo: 'pages',
                  value: featuresPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },

            /** authors */
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Authors',
                page: {
                  relationTo: 'pages',
                  value: authorsPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },

            /** tags */
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Tags',
                page: {
                  relationTo: 'pages',
                  value: tagsPages.id,
                },
              },

              menuLinkGroup: {
                groupLinks: [],
              },
            },

            /** more */
            {
              group: true,
              menuLink: {
                type: 'reference',
              },
              menuLinkGroup: {
                groupTitle: 'More',
                groupLinks: [
                  {
                    type: 'reference',
                    label: 'Subscribe',
                    newTab: false,
                    page: {
                      relationTo: 'pages',
                      value: subscribePages.id,
                    },
                  },
                  {
                    type: 'reference',
                    label: 'Membership',
                    newTab: false,
                    page: {
                      relationTo: 'pages',
                      value: membershipPages.id,
                    },
                  },
                  {
                    type: 'reference',
                    label: 'Contact',
                    newTab: false,
                    page: {
                      relationTo: 'pages',
                      value: contactPages.id,
                    },
                  },
                  {
                    type: 'reference',
                    label: 'Recommendations',
                    newTab: false,
                    page: {
                      relationTo: 'pages',
                      value: recommendationPages.id,
                    },
                  },
                ],
              },
            },
          ],
        },
        footer: {
          logo: {
            height: 24,
            width: 24,
            description:
              'A super minimal & lightweight theme with Premium Membership and fully PayloadCMS-v3-compatible.',
            imageUrl: ogImageUrl.id,
          },
          copyright: '© 2024 all rights reserved',
          footerLinks: [
            {
              group: false,
              menuLink: {
                type: 'reference',
                label: 'Authors',
                page: {
                  relationTo: 'pages',
                  value: authorsPages.id,
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
                  value: tagsPages.id,
                },
              },
            },
          ],
        },
        redirectionLinks: {
          tagLink: {
            relationTo: 'pages',
            value: tagsDetailsPages.id,
          },
          authorLink: {
            relationTo: 'pages',
            value: authorsDetailsPages.id,
          },
          blogLink: {
            relationTo: 'pages',
            value: blogsDetailsPages.id,
          },
        },
      },
    })

    spinner.succeed('Successfully creating site-settings...')
    return result
  } catch (error) {
    spinner.fail('Failed creating site-settings...')
    throw error
  }
}

export default seedSiteSettings
