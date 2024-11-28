'use client'

import Container from '../common/Container'
import { Params } from '../types'
import { FormType } from '@payload-types'
import React from 'react'

import FormComponent from './Components/Form'

interface FormProps extends FormType {
  params: Params
}
const FormBlock: React.FC<FormProps> = ({ params, ...block }) => {
  const form =
    block?.form?.value && typeof block?.form?.value === 'object'
      ? block?.form?.value
      : undefined

  return (
    <div className='xs:px-6 mx-auto my-16 w-full px-4 md:w-full md:max-w-screen-lg'>
      <Container>
        <h4 className='mb-8 text-lg font-semibold'>{block?.title}</h4>
        {form ? <FormComponent form={form} /> : null}
      </Container>
    </div>
  )
}

export default FormBlock
