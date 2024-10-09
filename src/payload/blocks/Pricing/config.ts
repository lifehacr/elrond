import { Block } from 'payload'

const PricingConfig: Block = {
  slug: 'Pricing',
  interfaceName: 'PricingType',
  labels: {
    singular: 'Pricing Block',
    plural: 'Pricing Blocks',
  },
  fields: [
    {
      name: 'pricingPlan',
      type: 'array',
      label: 'Pricing Table',
      admin: {
        description: 'Configure the pricing plans to display.',
      },
      fields: [
        {
          name: 'planIcon',
          label: 'Plan Icon',
          required: true,
          type: 'select',
          options: [
            { value: 'free', label: 'Free Plan' },
            { value: 'gold', label: 'Gold Plan' },
            { value: 'goldPlus', label: 'Gold Plus Plan' },
          ],
          admin: {
            description: 'Select an icon for the plan.',
          },
        },
        {
          name: 'planTitle',
          label: 'Plan Title',
          required: true,
          type: 'text',
          admin: {
            description:
              'Enter the title of the pricing plan (e.g., "Free", "Gold", etc.).',
          },
        },
        {
          name: 'freeDuration',
          label: 'Free Duration Period',
          type: 'text',
          required: false,
          admin: {
            description: 'Specify the duration of the free plan (optional).',
          },
        },
        {
          name: 'planDescription',
          label: 'Plan Description',
          type: 'text',
          required: true,
          admin: {
            description: 'Provide a brief description of the plan.',
          },
        },
        {
          name: 'monthlyPlanPrice',
          label: 'Monthly Plan Price',
          type: 'number',
          min: 0,
          max: 100000000,
          required: true,
          admin: {
            description: 'Enter the monthly price for the plan.',
          },
        },
        {
          name: 'yearlyPlanPrice',
          label: 'Yearly Plan Price',
          type: 'number',
          min: 0,
          max: 100000000,
          required: true,
          admin: {
            description: 'Enter the yearly price for the plan.',
          },
        },
        {
          name: 'planBtnText',
          label: 'Button Text',
          type: 'text',
          required: true,
          admin: {
            description: 'Enter the text for the call-to-action button.',
          },
        },
        {
          name: 'planBenefits',
          label: 'Plan Benefits',
          type: 'array',
          minRows: 2,
          maxRows: 10,
          admin: {
            description: 'List the benefits included in this plan.',
          },
          fields: [
            {
              name: 'benefit',
              type: 'text',
              required: true,
              admin: {
                description: 'Enter a specific benefit of the plan.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default PricingConfig
