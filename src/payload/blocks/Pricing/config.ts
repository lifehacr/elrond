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
      fields: [
        {
          name: 'planIcon',
          label: 'Plan Icon',
          required: true,
          type: 'select',
          options: [
            { value: 'free', label: 'Free Plan' },
            { value: 'gold', label: 'Gold Plan' },
            { value: 'goldPlus', label: 'Gold Plus Icon' },
          ],
        },
        {
          name: 'planTitle',
          label: 'Plan Title',
          required: true,
          type: 'text',
        },
        {
          name: 'freeDuration',
          label: 'Free Duration period',
          type: 'text',
          required: false,
        },
        {
          name: 'planDescription',
          label: 'Plan Description',
          type: 'text',
          required: true,
        },
        {
          name: 'monthlyPlanPrice',
          label: 'Monthly Plan Price',
          type: 'number',
          min: 0,
          max: 100000000,
          required: true,
        },
        {
          name: 'yearlyPlanPrice',
          label: 'Yearly Plan Price',
          type: 'number',
          min: 0,
          max: 100000000,
          required: true,
        },
        {
          name: 'planBtnText',
          label: 'Button Text',
          type: 'text',
          required: true,
        },
        {
          name: 'planBenefits',
          label: 'Plan Benefits',
          type: 'array',
          minRows: 2,
          maxRows: 10,
          fields: [
            {
              name: 'benefit',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

export default PricingConfig
