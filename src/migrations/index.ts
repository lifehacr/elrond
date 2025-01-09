import * as migration_20241213_104317 from './20241213_104317';
import * as migration_20250109_102814 from './20250109_102814';
import * as migration_20250109_103113 from './20250109_103113';
import * as migration_20250109_103245 from './20250109_103245';
import * as migration_20250109_103355 from './20250109_103355';

export const migrations = [
  {
    up: migration_20241213_104317.up,
    down: migration_20241213_104317.down,
    name: '20241213_104317',
  },
  {
    up: migration_20250109_102814.up,
    down: migration_20250109_102814.down,
    name: '20250109_102814',
  },
  {
    up: migration_20250109_103113.up,
    down: migration_20250109_103113.down,
    name: '20250109_103113',
  },
  {
    up: migration_20250109_103245.up,
    down: migration_20250109_103245.down,
    name: '20250109_103245',
  },
  {
    up: migration_20250109_103355.up,
    down: migration_20250109_103355.down,
    name: '20250109_103355'
  },
];
