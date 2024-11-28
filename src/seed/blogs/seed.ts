import configPromise from '@payload-config'
import { Tag, User } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { blogsData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async ({
  spinner,
  tags,
  authors,
}: {
  spinner: Ora
  tags: Tag[]
  authors: User[]
}) => {
  try {
    for await (const blog of blogsData) {
      const {
        alt,
        blogImage,
        author,
        content,
        description,
        title,
        tags: blogTags,
      } = blog

      const image = await payload.create({
        collection: 'media',
        data: {
          alt,
        },
        filePath: blogImage,
      })

      const filteredAuthors = author
        .map(authorSlug => {
          const sameAuthor = authors.find(
            author => author.username === authorSlug,
          )

          if (sameAuthor) {
            return {
              relationTo: 'users',
              value: sameAuthor.id,
            }
          }
        })
        .filter(
          (author): author is { relationTo: 'users'; value: number } =>
            !!author,
        )

      const filteredTags = blogTags
        .map(tagSlug => {
          const sameTag = tags.find(tag => tag.title === tagSlug)

          if (sameTag) {
            return {
              relationTo: 'tags',
              value: sameTag.id,
            }
          }
        })
        .filter((tag): tag is { relationTo: 'tags'; value: number } => !!tag)

      await payload.create({
        collection: 'blogs',
        data: {
          blogImage: image.id,
          content,
          description,
          title,
          author: filteredAuthors,
          tags: filteredTags,
          _status: 'published',
          meta: {
            description,
            title,
            image: image.id,
          },
        },
      })
    }

    spinner.succeed(`Successfully created blogs...`)
  } catch (error) {
    spinner.fail(`Failed creating blogs...`)
    throw error
  }
}

export default seed
