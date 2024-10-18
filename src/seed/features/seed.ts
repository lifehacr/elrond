import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { featureHeroImageData, featurePageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started created features-page...`)
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: featureHeroImageData.alt,
      },
      filePath: featureHeroImageData.filePath,
    })

    const formattedFeature: RequiredDataFromCollectionSlug<'pages'> = {
      ...featurePageData,
      layout: featurePageData?.layout?.map(block => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: imageResult?.id,
          }
        }
        return block
      }),
    }

    const result = await payload.create({
      collection: 'pages',
      data: formattedFeature,
    })

    spinner.succeed(`Successfully created features-page`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating features-page`)
    throw error
  }
}

export default seed
