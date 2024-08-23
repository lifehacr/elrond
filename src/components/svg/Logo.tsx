import React from 'react'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      width='124'
      height='28'
      viewBox='0 0 124 28'
      fill='none'
      className={`${className || ''}`}
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M15.0001 10.6684C15.5186 10.6684 15.926 10.2651 15.926 9.75188V1.61309C15.926 1.1365 15.5186 0.696563 15.0001 0.696563H0.888893C0.407409 0.696563 0 1.1365 0 1.61309V25.4795C0 25.9561 0.407409 26.3594 0.888893 26.3594H15.0001C15.5186 26.3594 15.926 25.9561 15.926 25.4795V17.3408C15.926 16.8275 15.5186 16.4242 15.0001 16.4242H10.963C10.4445 16.4242 10.0371 16.021 10.0371 15.5077V11.5849C10.0371 11.0717 10.4445 10.6684 10.963 10.6684H15.0001Z'
        fill='url(#paint0_linear_4_532)'
        // style=''
      />
      <path
        d='M19.676 1.61309C19.676 1.1365 20.0834 0.696563 20.5649 0.696563H28.7872C29.3057 0.696563 29.7131 1.1365 29.7131 1.61309V17.1941C29.7131 17.6707 30.1205 18.074 30.639 18.074H32.7502C33.2316 18.074 33.639 18.5139 33.639 18.9905V25.4795C33.639 25.9561 33.2316 26.3594 32.7502 26.3594H20.5649C20.0834 26.3594 19.676 25.9561 19.676 25.4795V1.61309Z'
        fill='url(#paint1_linear_4_532)'
        // style=''
      />
      <path
        d='M52.4586 17.634C54.866 15.9476 56.4216 13.198 56.4216 10.0452C56.4216 4.9126 52.1623 0.733224 46.9771 0.733224H37.3474C36.8659 0.733224 36.4215 1.1365 36.4215 1.61309V25.4429C36.4215 25.9561 36.8659 26.3594 37.3474 26.3594H44.9771C45.4585 26.3594 45.866 25.9561 45.866 25.4429V22.4367L51.2363 27.7525C51.6067 28.0825 52.1993 28.0825 52.5327 27.7525L56.9771 23.3899C57.3105 23.0232 57.3105 22.4367 56.9771 22.1067L52.4586 17.634ZM46.1623 12.3182C44.903 12.3182 43.8659 11.3283 43.8659 10.0452C43.8659 8.79869 44.903 7.80884 46.1623 7.80884C47.4215 7.80884 48.4586 8.79869 48.4586 10.0452C48.4586 11.3283 47.4215 12.3182 46.1623 12.3182Z'
        fill='url(#paint2_linear_4_532)'
        // style=''
      />
      <path
        d='M69.0779 0C63.5593 0 59.0778 4.39935 59.0778 9.86187C59.0778 15.3244 63.5593 19.7237 69.0779 19.7237C74.5964 19.7237 79.0409 15.3244 79.0409 9.86187C79.0409 4.39935 74.5964 0 69.0779 0ZM69.0779 12.1715C67.7816 12.1715 66.7445 11.145 66.7445 9.86187C66.7445 8.57872 67.7816 7.55221 69.0779 7.55221C70.3742 7.55221 71.4112 8.57872 71.4112 9.86187C71.4112 11.145 70.3742 12.1715 69.0779 12.1715ZM76.5964 22.2534C76.5964 21.7768 76.189 21.3368 75.6705 21.3368H62.4852C61.9667 21.3368 61.5593 21.7768 61.5593 22.2534V25.4429C61.5593 25.9561 61.9667 26.3594 62.4852 26.3594H75.6705C76.189 26.3594 76.5964 25.9561 76.5964 25.4429V22.2534Z'
        fill='url(#paint3_linear_4_532)'
        // style=''
      />
      <path
        d='M93.1101 25.6995C93.4434 26.0661 93.7768 26.3594 94.6286 26.3594H100.295C100.814 26.3594 101.221 25.9561 101.221 25.4429V1.61309C101.221 1.1365 100.814 0.696563 100.295 0.696563H94.6286C94.1101 0.696563 93.7027 1.1365 93.7027 1.61309V4.47267C93.7027 4.94926 93.036 5.09591 92.7027 4.69264L89.9619 1.39313C89.6286 0.989853 89.2953 0.696563 88.4064 0.696563H82.7397C82.2582 0.696563 81.8508 1.1365 81.8508 1.61309V25.4429C81.8508 25.9561 82.2582 26.3594 82.7397 26.3594H88.4434C88.9249 26.3594 89.3693 25.9561 89.3693 25.4429V22.62C89.3693 22.1067 90.036 21.9967 90.3323 22.3633L93.1101 25.6995Z'
        fill='url(#paint4_linear_4_532)'
        // style=''
      />
      <path
        d='M114.37 26.3594H123.074C123.593 26.3594 124 25.9561 124 25.4795V1.61309C124 1.1365 123.593 0.733224 123.074 0.733224H114.37C113.889 0.733224 113.481 1.1365 113.481 1.61309V7.66219C108.259 7.66219 104 11.8416 104 17.0108C104 22.18 108.259 26.3961 113.481 26.3961L114.37 26.3594ZM111.778 17.0475C111.778 15.7643 112.815 14.7378 114.111 14.7378C115.37 14.7378 116.407 15.7643 116.407 17.0475C116.407 18.3306 115.37 19.3571 114.111 19.3571C112.815 19.3571 111.778 18.3306 111.778 17.0475Z'
        fill='url(#paint5_linear_4_532)'
        // style=''
      />
      <defs>
        <linearGradient
          id='paint0_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
        <linearGradient
          id='paint1_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
        <linearGradient
          id='paint2_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
        <linearGradient
          id='paint3_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
        <linearGradient
          id='paint4_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
        <linearGradient
          id='paint5_linear_4_532'
          x1='2.68109'
          y1='-6.74795e-07'
          x2='12.7654'
          y2='53.3648'
          gradientUnits='userSpaceOnUse'>
          <stop
            stopColor='#FFD69C'
            // style='stopColor:#FFD69C;stopColor:color(display-p3 1.0000 0.8406 0.6104);stopOpacity:1;'
          />
          <stop
            offset='1'
            stopColor='#F95E70'
            // style='stopColor:#F95E70;stopColor:color(display-p3 0.9765 0.3686 0.4392);stopOpacity:1;'
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Logo
