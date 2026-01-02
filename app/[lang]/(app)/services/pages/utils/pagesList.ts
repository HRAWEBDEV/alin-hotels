import { DeepMutable } from '@/utils/deepMutable';

type Pages = DeepMutable<typeof pages>;
type Path = keyof Pages;
type Page = {
 [P in Path]: Pages[P][keyof Pages[P]];
}[Path];

const pages = {
 'general-settings': {
  users: {
   name: 'users',
  },
  'real-persons': {
   name: 'real-persons',
  },
  companies: {
   name: 'companies',
  },
  owners: {
   name: 'owners',
  },
 },
 'hotel-information': {
  hotels: {
   name: 'hotels',
  },
 },
} as const;

export type { Pages, Page, Path };
export { pages };
