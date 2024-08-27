import Container from '../common/Container'
import ThreeDots from '../common/ThreeDots'
import { FeaturesType } from '@payload-types'

const Features: React.FC<FeaturesType> = ({ ...block }) => {
  return (
    <Container className='my-12 px-4 sm:my-24 md:max-w-2xl lg:px-0'>
      {block?.features?.map((feature, index) => (
        <div key={index}>
          <div className='mb-4 text-[1.72rem] font-bold'>{feature?.title}</div>
          <ul className='list-disc'>
            {feature?.points?.map((featurePoint, index) => (
              <li key={index} className='my-3 ml-5 text-lg text-[#3F3F46]'>
                {featurePoint?.point}
              </li>
            ))}
          </ul>
          {index < block?.features?.length! - 1 && <ThreeDots />}
        </div>
      ))}
    </Container>
  )
}

export default Features
