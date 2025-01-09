import { collectionSlug, cqlConfig } from '@contentql/core'
import { env } from '@env'
import path from 'path'
import { fileURLToPath } from 'url'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'
import { migrations } from '@/migrations'
import { blocksConfig } from '@/payload/blocks/index'
import { Contacts } from '@/payload/collections/contact'
import { revalidateAuthors } from '@/payload/hooks/revalidateAuthors'
import { revalidateBlogs } from '@/payload/hooks/revalidateBlogs'
import { revalidatePages } from '@/payload/hooks/revalidatePages'
import { revalidateTags } from '@/payload/hooks/revalidateTags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const convertRailwayURL = (url: string) => {
  const railwayDomain = '.up.railway.app'
  const contentqlDomain = '.contentql.io'

  // Check if the URL ends with .up.railway.app or contains it
  if (url.includes(railwayDomain)) {
    return url.replace(railwayDomain, contentqlDomain)
  }

  // Return the original URL if it doesn't match
  return url
}

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
    },
  },
  cors: [env.PAYLOAD_URL, convertRailwayURL(env.PAYLOAD_URL)],
  csrf: [env.PAYLOAD_URL, convertRailwayURL(env.PAYLOAD_URL)],
  collections: [
    Contacts,
    {
      slug: collectionSlug['users'],
      fields: [],
      auth: {
        forgotPassword: {
          generateEmailHTML: args => {
            return ResetPassword({
              resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
              userFirstName: args?.user.username,
            })
          },
        },
        verify: {
          generateEmailHTML: ({ token, user }) => {
            return UserAccountVerification({
              actionLabel: 'verify your account',
              buttonText: 'Verify Account',
              userName: user.username,
              image: user.imageUrl,
              href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
            })
          },
        },
      },
      hooks: {
        afterChange: [revalidateAuthors],
      },
    },
    {
      slug: collectionSlug.pages,
      fields: [],
      hooks: {
        afterChange: [revalidatePages],
      },
    },
    {
      slug: collectionSlug.blogs,
      fields: [],
      hooks: {
        afterChange: [revalidateBlogs],
      },
    },
    {
      slug: collectionSlug.tags,
      fields: [],
      hooks: {
        afterChange: [revalidateTags],
      },
    },
  ],

  baseURL: env.PAYLOAD_URL,

  secret: env.PAYLOAD_SECRET,

  dbURI: env.DATABASE_URI,
  dbSecret: env.DATABASE_SECRET,
  syncDB: false,
  prodMigrations: migrations,

  s3: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    bucket: env.S3_BUCKET,
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  blocks: blocksConfig,
})
