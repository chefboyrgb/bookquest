// Narnia Game — Main export
// Bundles all content modules for The Lion, the Witch and the Wardrobe

export { metadata } from './metadata.js';
export { storyNodes } from './stories.js';
export { items } from './items.js';
export { characters } from './characters.js';
export { locations } from './locations.js';
export { vocabulary } from './vocab.js';

// Default export with all content
import { metadata } from './metadata.js';
import { storyNodes } from './stories.js';
import { items } from './items.js';
import { characters } from './characters.js';
import { locations } from './locations.js';
import { vocabulary } from './vocab.js';

export default {
  metadata,
  storyNodes,
  items,
  characters,
  locations,
  vocabulary,
};
