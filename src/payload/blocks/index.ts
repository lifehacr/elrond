// This is just to consolidate all the existing blocks and their respective JSX components
// Always prefer to individually import the required block or JSX in other parts of your application
// Importing the block components and its configurations
import { Details, DetailsConfig } from './Details'
import { FeaturedPost, FeaturedPostConfig } from './FeaturedPost'
import { Hero, HeroConfig } from './Hero'
import { Home, HomeConfig } from './Home'
import { LatestPosts, LatestPostsConfig } from './LatestPosts'
import { List, ListConfig } from './List'

// Exporting an object that maps block names (as keys) to their corresponding JSX components (as values)
// This object allows dynamic rendering of components based on the block names
export const blocksJSX = {
  Home,
  Details,
  List,
  Hero,
  FeaturedPost,
  LatestPosts,
}

// Exporting an array that consolidates all block configurations
// This array is useful for registering or iterating over all blocks and their configurations in one place
export const blocks = [
  HomeConfig,
  DetailsConfig,
  ListConfig,
  HeroConfig,
  FeaturedPostConfig,
  LatestPostsConfig,
]
