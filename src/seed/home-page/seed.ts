import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { RequiredDataFromCollectionSlug } from 'payload'

import { homePageData, homePageHeroImageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (): Promise<Page> => {
  try {
    const { docs: allTags, totalDocs: totalTags } = await payload.find({
      collection: 'tags',
    })

    const { docs: allBlogs, totalDocs: totalBlogs } = await payload.find({
      collection: 'blogs',
    })
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
      data: homePageData,
    })

    return result
  } catch (error) {
    throw error
  }
}

export default seed
