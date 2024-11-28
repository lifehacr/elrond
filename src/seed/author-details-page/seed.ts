import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { authorDetailsPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({
  spinner,
  id,
}: {
  spinner: Ora
  id: number
}): Promise<Page> => {
  try {
    spinner.start(`Started created author-details-page...`)
    const result = await payload.create({
      collection: 'pages',
      data: { ...authorDetailsPageData, parent: id },
    })

    spinner.succeed(`Successfully created author-details-page...`)
    return result
  } catch (error) {
    spinner.fail(`Failed creating author-details-page...`)
    throw error
  }
}

export default seed
