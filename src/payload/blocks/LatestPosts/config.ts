import { Block } from 'payload'

const LatestPostsConfig: Block = {
  slug: 'LatestPosts',
  // imageURL: '',
  interfaceName: 'LatestPostsType',
  labels: {
    singular: 'LatestPosts Block',
    plural: 'LatestPosts Blocks',
  },
  fields: [
    {
      name: 'titleOne',
      label: 'Title One',
      type: 'text',
    },
    {
      name: 'titleTwo',
      label: 'Title Two',
      type: 'text',
    },
    {
      name: 'titleThree',
      label: 'Title Three',
      type: 'text',
    },
    {
      name: 'buttonName',
      label: 'Button Name',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonPath',
      label: 'Button Path',
      type: 'text',
      required: true,
    },
  ],
}

export default LatestPostsConfig
