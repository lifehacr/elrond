import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { homePageData, homePageHeroImageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created home-page...`)
    const homeHeroImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: homePageHeroImageData?.alt },
      filePath: homePageHeroImageData?.filePath,
    })

    const homeResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...homePageData,
      layout: homePageData.layout?.map((block, idx) => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: homeHeroImageSeedResult.id,
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: homeResult,
    })

    spinner.succeed(`Successfully created home-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create home-page`)
    throw error
  }
}

export default seed
