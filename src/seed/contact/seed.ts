import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import { contactImageData, contactPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
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

    return result
  } catch (error) {
    throw error
  }
}

export default seed
