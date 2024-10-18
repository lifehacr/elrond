import configPromise from '@payload-config'
import { User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { authorImageData, authorsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<User[]> => {
  try {
    spinner.start(`Started uploading author images...`)

    // Upload the images to the media collection and store their ObjectIds
    const uploadedImages = await Promise.all(
      authorImageData.map(image =>
        payload.create({
          collection: 'media',
          data: {
            alt: image.alt,
          },
          filePath: image.filePath,
        }),
      ),
    )

    const formattedAuthorsData = authorsData.map((author, idx) => {
      return {
        ...author,
        imageUrl: uploadedImages[idx].id,
        collection: 'users',
      }
    })

    const results = await Promise.allSettled(
      formattedAuthorsData.map(authorData =>
        payload.create({
          collection: 'users',
          data: authorData,
          locale: undefined,
          fallbackLocale: undefined,
          overrideAccess: true,
          disableVerificationEmail: true,
          context: {
            preventRoleOverride: true,
          },
        }),
      ),
    )

    const successfulResults = results
      .filter(result => result.status === 'fulfilled')
      .map(result => (result as PromiseFulfilledResult<User>).value)

    const errors = results
      .filter(result => result.status === 'rejected')
      .map(
        result => `Failed to seed: ${(result as PromiseRejectedResult).reason}`,
      )

    if (errors.length > 0) {
      throw new Error(
        `Seeding failed with the following errors:\n${errors.join('\n')}`,
      )
    }

    spinner.succeed(`Successfully created author accounts...`)
    return successfulResults
  } catch (error) {
    spinner.fail(`Failed creating author accounts...`)
    throw error
  }
}

export default seed
