/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import { importMap } from '../importMap.js'

/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import type { Metadata } from 'next'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Args): Promise<Metadata> => {
  const generatedMeta = await generatePageMetadata({
    config,
    params,
    searchParams,
  })

  return {
    ...generatedMeta,
    icons: [
      {
        type: 'image/png',
        rel: 'icon',
        sizes: '32x32',
        url: 'favicon.ico',
      },
    ],
  }
}

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config, importMap, params, searchParams })

export default NotFound
