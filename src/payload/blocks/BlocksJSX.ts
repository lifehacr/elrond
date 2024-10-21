import { DisqusComments } from '@contentql/core/client'

import { Contact } from './Contact'
import { Details } from './Details'
import { FAQ } from './FAQ'
import { FeaturedPost } from './FeaturedPost'
import { Features } from './Features'
import { FormBlock } from './Form'
import { Hero } from './Hero'
import { Home } from './Home'
import { LatestPosts } from './LatestPosts'
import { List } from './List'
import { Pricing } from './Pricing'
import { RecommendationsList } from './RecommendationsList'
import { Subscribe } from './Subscribe'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Home,
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
