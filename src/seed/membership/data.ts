import { Page } from '@payload-types'
import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type MembershipPageDataType = Omit<
  Page,
  'id' | 'createdAt' | 'updatedAt'
>

export type MembershipImageType = {
  alt: string
  filePath: string
}

export const membershipPageData: RequiredDataFromCollectionSlug<'pages'> = {
  title: 'Membership',
  _status: 'published',
  layout: [
    {
      blockType: 'Hero',
      title: 'Membership',
      description:
        'Enhance your reading with our membership. Gain exclusive access to in-depth blog articles. Explore the perks of joining below.',
      image: '',
    },
    {
      blockType: 'Pricing',
      pricingPlan: [
        {
          monthlyPlanPrice: 0,
          planBtnText: 'sign up for free',
          planTitle: 'Free',
          planDescription:
            'Access essential content for free. Start your journey today!',
          planIcon: 'free',
          yearlyPlanPrice: 0,
          freeDuration: 'forever',
          planBenefits: [
            { benefit: 'Access to free content' },
            { benefit: 'Limited-time free resources' },
            { benefit: 'Weekly email newsletter' },
          ],
        },
        {
          monthlyPlanPrice: 8,
          planBtnText: 'sign up now',
          planTitle: 'Gold',
          planDescription:
            'Explore exclusive articles and events. Elevate your experience with Gold.',
          planIcon: 'gold',
          yearlyPlanPrice: 79,
          planBenefits: [
            { benefit: 'Access to premium content' },
            { benefit: 'Early access to new releases' },
            { benefit: 'Simple, secure card payment' },
            { benefit: 'No Advertising' },
          ],
        },
        {
          monthlyPlanPrice: 15,
          planBtnText: 'sign up now',
          planTitle: 'Golden Plus',
          planDescription:
            'Ultimate access to all content and perks. Discover the pinnacle of membership.',
          planIcon: 'goldPlus',
          freeDuration: '7 days free',
          yearlyPlanPrice: 149,
          planBenefits: [
            { benefit: 'Access to premium content' },
            { benefit: 'Early access to new releases' },
            { benefit: 'Simple, secure card payment' },
            { benefit: 'No Advertising' },
            { benefit: 'Priority customer support' },
          ],
        },
      ],
    },
    {
      blockType: 'FAQ',
      title: 'Have Questions? Explore Our FAQ Section',
      description:
        "Navigate our FAQ hub for brief yet detailed responses to common queries. From membership tiers to payment info, find the information you need for a hassle-free experience. Can't locate what you're after? Our support team is here to help.",
      questions: [
        {
          question: 'Membership Tiers',
          answer:
            'Learn about our different membership tiers and find the one that suits your needs best. Discover the exclusive benefits and features each tier has to offer.',
        },
        {
          question: 'Payment and Billing',
          answer:
            "Get answers to your questions about payments, billing cycles, and subscription management. We've got you covered with all the details you need to know.",
        },

        {
          question: 'Accessing Premium Content',
          answer:
            'Wondering how to access premium content after becoming a member? Find step-by-step instructions and troubleshoot common issues in our Accessing Premium Content section.',
        },
      ],
    },
  ],
}

export const membershipImageData: MembershipImageType = {
  alt: 'membership hero image ',
  filePath: path.join(
    process.cwd(),
    '/public/images/seed/membership/membershipHero.webp',
  ),
}
