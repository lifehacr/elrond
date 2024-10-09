import { Block } from 'payload'

const LatestPostsConfig: Block = {
  slug: 'LatestPosts',
  interfaceName: 'LatestPostsType',
  labels: {
    singular: 'Latest Posts Block',
    plural: 'Latest Posts Blocks',
  },
  fields: [
    {
      name: 'titleOne',
      label: 'Title One',
      type: 'text',
      admin: {
        description:
          'Enter the first title to be displayed in the latest posts section.',
      },
    },
    {
      name: 'titleTwo',
      label: 'Title Two',
      type: 'text',
      admin: {
        description:
          'Enter the second title to be displayed in the latest posts section.',
      },
    },
    {
      name: 'titleThree',
      label: 'Title Three',
      type: 'text',
      admin: {
        description:
          'Enter the third title to be displayed in the latest posts section.',
      },
    },
    {
      name: 'buttonName',
      label: 'Button Name',
      type: 'text',
      required: true,
      admin: {
        description:
          'Enter the text for the button in the latest posts section.',
      },
    },
    {
      name: 'buttonPath',
      label: 'Button Path',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter the URL or path for the button.',
      },
    },
  ],
}

export default LatestPostsConfig
