import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { contactImageData, contactPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started creating contact page...`)
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: contactImageData.alt,
      },
      filePath: contactImageData.filePath,
    })

    const formattedContact: RequiredDataFromCollectionSlug<'pages'> = {
      ...contactPageData,
      layout: contactPageData?.layout?.map(block => {
        if (block?.blockType === 'Contact') {
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
      data: formattedContact,
    })

    spinner.succeed(`Successfully created Contact page`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create contact page`)
    throw error
  }
}

export default seed
