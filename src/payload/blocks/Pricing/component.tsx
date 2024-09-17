'use client'

import Container from '../common/Container'
import { PricingType } from '@payload-types'
import React, { JSX, useState } from 'react'

import FreePlanIcon from '@/svg/FreePlanIcon'
import GoldPlanIcon from '@/svg/GoldPlanIcon'
import GoldPlusPlanIcon from '@/svg/GoldPlusPlanIcon'
import ListItemTickIcon from '@/svg/ListItemTickIcon'

const PlanIcons: { [key: string]: JSX.Element } = {
  free: <FreePlanIcon />,
  gold: <GoldPlanIcon />,
  goldPlus: <GoldPlusPlanIcon />,
}

const Pricing: React.FC<PricingType> = ({ ...block }) => {
  const [monthly, setMonthly] = useState<boolean>(true)
  const [yearly, setYearly] = useState<boolean>(true)

  const handleMonthly = () => {
    setMonthly(true)
    setYearly(false)
  }

  const handleYearly = () => {
    setMonthly(false)
    setYearly(true)
  }

  return (
    <div className='xs:px-6 mx-auto my-16 w-full px-4 md:w-full md:max-w-screen-lg'>
      <div className='mx-auto mb-9 flex w-48 items-center space-x-1 rounded-full bg-gray-100 p-1.5'>
        <button
          onClick={handleMonthly}
          className={`${
            monthly ? 'bg-white shadow' : 'bg-transparent'
          } w-24 rounded-full px-4 py-3 text-sm text-gray-600 focus:outline-none`}>
          Monthly
        </button>
        <button
          onClick={handleYearly}
          className={`${
            yearly ? 'bg-white shadow' : 'bg-transparent'
          } w-24 rounded-full px-4 py-3 text-sm text-gray-600 focus:outline-none`}>
          Yearly
        </button>
      </div>
      <Container className='flex select-none flex-col items-center justify-center gap-8 px-4 lg:flex lg:flex-row lg:items-start'>
        {block?.pricingPlan?.map(membershipPlan => {
          return (
            <div
              className='flex h-fit w-full max-w-screen-sm flex-col gap-3 rounded-2xl border-[1.6px] border-zinc-100 p-6'
              key={membershipPlan?.id}>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-start gap-2.5'>
                  {PlanIcons[membershipPlan?.planIcon || 'free']}
                  <div className='flex flex-col items-start justify-center gap-1.5'>
                    <div className='line-clamp-1 text-xl font-bold leading-none text-base-content'>
                      {membershipPlan?.planTitle}
                    </div>
                    <div className='text-sm font-normal leading-none text-secondary-content'>
                      {membershipPlan?.freeDuration}
                    </div>
                  </div>
                </div>
                <div className='mt-2 font-normal text-neutral-content'>
                  {membershipPlan?.planDescription}
                </div>
                <div className='my-3 flex flex-row items-center justify-start gap-2 text-3xl font-bold'>
                  {monthly
                    ? membershipPlan?.monthlyPlanPrice
                    : membershipPlan?.yearlyPlanPrice}{' '}
                  <span className='text-sm font-normal text-neutral-content'>
                    {membershipPlan?.monthlyPlanPrice === 0 &&
                    membershipPlan?.yearlyPlanPrice === 0
                      ? '/ forever'
                      : monthly
                        ? '/ monthly'
                        : '/ yearly'}
                  </span>
                </div>
                <button
                  type='submit'
                  className={`h-10 max-h-10 min-h-[40px] w-full rounded-md  text-[14px] font-medium  ${membershipPlan?.monthlyPlanPrice === 0 && membershipPlan?.yearlyPlanPrice === 0 ? 'bg-secondary text-secondary-content' : 'bg-primary text-white hover:bg-[#805AE9]'}`}>
                  ✦ &nbsp;{membershipPlan?.planBtnText}
                </button>
              </div>
              <div className='ml-0.5 mt-3'>
                <ul className='flex flex-col gap-3 text-[15px] font-light text-[#3F3F46]'>
                  {membershipPlan?.planBenefits?.map(planBenefit => {
                    return (
                      <li key={planBenefit?.id} className='flex gap-2.5'>
                        <ListItemTickIcon />{' '}
                        <span>{planBenefit?.benefit ?? 'Default Benefit'}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </Container>
    </div>
  )
}

export default Pricing
