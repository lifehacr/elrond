import configPromise from '@payload-config'
import { Page } from '@payload-types'
import { getPayload } from 'payload'
import { Ora } from 'ora'

import { tagDetailsPageData } from './data'

const payload = await getPayload({ config: configPromise })

const seed = async ({
  spinner,
  id,
}: {
  spinner: Ora
  id: number
}): Promise<Page> => {
  spinner.start(`Started creating tag-details page...`)
  try {
    const result = await payload.create({
      collection: 'pages',
      data: { ...tagDetailsPageData, parent: id },
    })
    spinner.succeed(`Successfully created tag-details-page`)

    return result
  } catch (error) {
    spinner.fail(`Failed creating tags-details-page`)
    throw error
  }
}

export default seed
