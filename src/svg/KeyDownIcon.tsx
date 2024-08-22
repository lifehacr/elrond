import React from 'react'

interface KeyDownIconProps {
  className?: string
}

const KeyDownIcon: React.FC<KeyDownIconProps> = ({ className }) => {
  return (
    <svg
      className={`inline-block text-zinc-900 ${className || ''}`}
      width='20px'
      height='20px'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'>
      <path
        d='M6 9L12 15L18 9'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'></path>
    </svg>
  )
}

export default KeyDownIcon
