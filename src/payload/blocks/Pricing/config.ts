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
          name: 'planPrice',
          label: 'Plan Price',
          type: 'number',
          min: 0,
          max: 100000000,
          required: true,
        },
        {
          name: 'planDuration',
          label: 'Plan Duration',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'monthly / yearly',
          },
        },
        {
          name: 'planBtnText',
          label: 'Button Text',
          type: 'text',
          required: true,
        },
        {
          name: 'planBenifits',
          label: 'Plan Benifits',
          type: 'array',
          minRows: 2,
          maxRows: 10,
          fields: [
            {
              name: 'benifit',
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
