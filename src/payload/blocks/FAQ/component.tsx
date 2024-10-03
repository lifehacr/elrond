'use client'

import { FAQType } from '@payload-types'
import { useState } from 'react'

import KeyDownIcon from '@/svg/KeyDownIcon'

const FAQ: React.FC<FAQType> = ({ ...block }) => {
  const [openIndexes, setOpenIndexes] = useState([false, false, false, false])

  const toggleAccordion = (index: number) => {
    setOpenIndexes(prev => {
      const newOpenIndexes = [...prev]
      newOpenIndexes[index] = !newOpenIndexes[index]
      return newOpenIndexes
    })
  }

  return (
    <div className='xs:px-6 mx-auto my-16 w-full px-4 md:w-full md:max-w-screen-lg'>
      <div className='mx-auto my-12 flex flex-col items-center justify-start gap-2 px-4 md:max-w-2xl'>
        <div className='my-14 flex justify-center'>
          <span className='mx-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-300'></span>
          <span className='mx-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-300'></span>
          <span className='mx-2 inline-block h-1.5 w-1.5 rounded-full bg-gray-300'></span>
        </div>
        <div className='mx-auto'>
          <div className='mb-4 text-3xl font-bold'>{block?.title}</div>
          <p className='text-lg font-light text-[#3F3F46]'>
            {block?.description}
          </p>
        </div>
        <div className='w-full'>
          {/* {block?.Questionnaire?.} */}
          {block?.questions?.map((item, index) => (
            <div
              key={index}
              className='mt-8 w-full select-none rounded-lg border border-[#E4E4E7] p-6'>
              <div
                className='flex w-full cursor-pointer select-none items-center justify-between'
                onClick={() => toggleAccordion(index)}>
                <div className='text-xl font-semibold'>{item?.question}</div>
                <div className='ml-4'>
                  {openIndexes[index] ? (
                    <KeyDownIcon className='rotate-180 text-[#D4D4D8]' />
                  ) : (
                    <KeyDownIcon className='text-[#D4D4D8]' />
                  )}
                </div>
              </div>
              {openIndexes[index] && (
                <div className='mt-4 select-none text-[17px] font-light leading-7 text-[#3F3F46]'>
                  {item?.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
