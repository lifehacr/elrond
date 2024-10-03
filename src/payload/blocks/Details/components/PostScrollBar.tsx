'use client'

import Container from '../../common/Container'
import { env } from '@env'
import { Blog, Media } from '@payload-types'
import { motion, useScroll, useSpring } from 'framer-motion'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Copy from '@/svg/Copy'
import TickMark from '@/svg/TickMark'

const PostScrollBar = ({ blog }: { blog: Blog }) => {
  const pathName = usePathname()
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [showContainer, setShowContainer] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition > 70) {
      setShowContainer(true)
    } else {
      setShowContainer(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  function copyText(pathName: string) {
    navigator.clipboard
      .writeText(`${env.NEXT_PUBLIC_PUBLIC_URL}${pathName}`)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(err => console.error('Failed to copy text: ', err))
  }
  return (
    <div className='sticky top-0 z-10 bg-base-100'>
      {showContainer && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
          <Container>
            <div className='flex h-16 w-full items-center justify-between sm:h-[74px]'>
              <div className='xs:gap-4 flex items-center justify-center gap-3'>
                <Image
                  alt='Author'
                  width={40}
                  height={40}
                  className='!h-[40px] !w-[40px] rounded-full object-cover'
                  src={(blog?.blogImage as Media)?.url!}
                />
                <div className='line-clamp-1 text-lg sm:font-semibold'>
                  {blog?.title}
                </div>
              </div>

              <button
                onClick={() => copyText(pathName)}
                className={`flex items-center gap-[0.5rem] !rounded-full bg-[#e3e3e3] px-3 py-2 text-sm font-bold`}>
                {copied ? <TickMark /> : <Copy />}
                {copied ? 'Copied' : 'Copy Link'}
              </button>
            </div>
          </Container>
        </motion.div>
      )}
      <motion.div
        className='progress-bar h-1 origin-left bg-primary '
        style={{ scaleX }}
      />
    </div>
  )
}

export default PostScrollBar
