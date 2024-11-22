import { DisqusComments } from '@contentql/core/client'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('./Contact/component'))
const Details = dynamic(() => import('./Details/component'))
const FAQ = dynamic(() => import('./FAQ/component'))
const FeaturedPost = dynamic(() => import('./FeaturedPost/component'))
const LatestPosts = dynamic(() => import('./LatestPosts/component'))
const Pricing = dynamic(() => import('./Pricing/component'))
const RecommendationsList = dynamic(
  () => import('./RecommendationsList/component'),
)
const Subscribe = dynamic(() => import('./Subscribe/component'))
const List = dynamic(() => import('./List/component'))
const FormBlock = dynamic(() => import('./Form/component'))
const Hero = dynamic(() => import('./Hero/component'))
const Features = dynamic(() => import('./Features/component'))

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Details,
  List,
  Hero,
  FeaturedPost,
  LatestPosts,
  Contact,
  FAQ,
  Pricing,
  RecommendationsList,
  Features,
  Subscribe,
  DisqusComments,
  FormBlock,
}
