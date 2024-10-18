// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { ContactConfig } from './Contact'
import { DetailsConfig } from './Details'
import { FAQConfig } from './FAQ'
import { FeaturedPostConfig } from './FeaturedPost'
import { FeaturesConfig } from './Features'
import { HeroConfig } from './Hero'
import { HomeConfig } from './Home'
import { LatestPostsConfig } from './LatestPosts'
import { ListConfig } from './List'
import { PricingConfig } from './Pricing'
import { RecommendationsListConfig } from './RecommendationsList'
import { SubscribeConfig } from './Subscribe'

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [
  HomeConfig,
  DetailsConfig,
  ListConfig,
  HeroConfig,
  FeaturedPostConfig,
  LatestPostsConfig,
  ContactConfig,
  FAQConfig,
  PricingConfig,
  RecommendationsListConfig,
  FeaturesConfig,
  SubscribeConfig,
]
