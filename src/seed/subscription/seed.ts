import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { subscriptionImageData, subscriptionPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started creating subscription page...`)
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: subscriptionImageData.alt,
      },
      filePath: subscriptionImageData.filePath,
    })

    const formattedSubscription: RequiredDataFromCollectionSlug<'pages'> = {
      ...subscriptionPageData,
      layout: subscriptionPageData?.layout?.map(block => {
        if (block?.blockType === 'Subscribe') {
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
      data: formattedSubscription,
    })

    spinner.succeed(`Successfully created subscription page`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create subscription page`)
    throw error
  }
}

export default seed
