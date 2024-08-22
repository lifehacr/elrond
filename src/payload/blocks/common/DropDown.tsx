import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import KeyDownIcon from '@/svg/KeyDownIcon'

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown()
      }
    }

    const handleScroll = () => {
      closeDropdown()
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex items-center gap-x-1 px-4 py-2 text-base font-[450] text-[#3F3F46]'>
        More <KeyDownIcon />
      </button>

      {isOpen && (
        <div className='absolute left-1/2 z-20 mt-2 w-56 origin-top-left translate-x-[-50%] rounded-xl bg-white shadow-lg'>
          <ul className='py-1'>
            <li>
              <Link
                href='/subscribe'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Subscribe Page
              </Link>
            </li>
            <li>
              <Link
                href='/author/celia'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Single Author Page
              </Link>
            </li>
            <li>
              <Link
                href='/tag/arcane'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Single Tag Page
              </Link>
            </li>
            <li>
              <Link
                href='/blogPost'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Centered Post
              </Link>
            </li>{' '}
            <li>
              <Link
                href='/recommendations'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Recommendations
              </Link>
            </li>{' '}
            <li>
              <Link
                href='/Contact'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Contact
              </Link>
            </li>{' '}
            <li>
              <Link
                href='/404'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                404 Page
              </Link>
            </li>
            <li>
              <Link
                href='/documentation'
                className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                Documentation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropDown
