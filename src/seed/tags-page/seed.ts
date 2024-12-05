import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { tagImageData, tagsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async (spinner: Ora): Promise<Page> => {
  try {
    spinner.start(`Started creating tags-page...`)
    const imageResult = await payload.create({
      collection: 'media',
      data: {
        alt: tagImageData.alt,
      },
      filePath: tagImageData.filePath,
    })

    const formattedTagsData: RequiredDataFromCollectionSlug<'pages'> = {
      ...tagsPageData,
      layout: tagsPageData?.layout?.map(block => {
        if (block?.blockType === 'Hero') {
          return {
            ...block,
            image: imageResult?.id!,
          }
        } else return block
      }),
    }
    const result = await payload.create({
      collection: 'pages',
      data: formattedTagsData,
    })

    spinner.succeed(`Successfully created tags-page`)
    return result
  } catch (error) {
    spinner.fail(`Failed to create tags-page`)
    throw error
  }
}

export default seed
