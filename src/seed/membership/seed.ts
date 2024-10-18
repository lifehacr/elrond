import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { membershipImageData, membershipPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started creating membership page...`)
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: membershipImageData.alt,
      },
      filePath: membershipImageData.filePath,
    })

    const formattedMembership: RequiredDataFromCollectionSlug<'pages'> = {
      ...membershipPageData,
      layout: membershipPageData?.layout?.map(block => {
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
      data: formattedMembership,
    })

    spinner.succeed(`Successfully created membership page`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating membership page`)
    throw error
  }
}

export default seed
