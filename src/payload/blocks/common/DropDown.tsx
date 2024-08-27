import { Page, SiteSetting } from '@payload-types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import KeyDownIcon from '@/svg/KeyDownIcon'

interface Props {
  headerLink: NonNullable<Required<SiteSetting>['header']['menuLinks']>[number]
}

const DropDown: React.FC<Props> = ({ headerLink }) => {
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

  function capitalizeFirstLetter(string: string) {
    if (!string) return string
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className='flex items-center gap-x-1 px-4 py-2 text-base font-[450] text-[#3F3F46]'>
        {capitalizeFirstLetter(headerLink?.menuLinkGroup?.groupTitle!)}{' '}
        <KeyDownIcon />
      </button>

      {isOpen && (
        <div className='absolute left-1/2 z-20 mt-2 w-56 origin-top-left translate-x-[-50%] rounded-xl bg-white shadow-lg'>
          <ul className='py-1'>
            {headerLink?.menuLinkGroup?.groupLinks?.map((link, index) =>
              link?.externalLink ? (
                <li key={index}>
                  <Link
                    href={link?.link!}
                    target={`${link?.newPage ? '_blank' : '_self'}`}
                    className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                    {capitalizeFirstLetter(link?.label!)}
                  </Link>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    href={(link?.page?.value as Page)?.slug!}
                    target={`${link?.newPage ? '_blank' : '_self'}`}
                    className='block px-4 py-2 text-base text-gray-700 hover:bg-gray-100'>
                    {capitalizeFirstLetter((link?.page?.value as Page)?.title)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropDown
