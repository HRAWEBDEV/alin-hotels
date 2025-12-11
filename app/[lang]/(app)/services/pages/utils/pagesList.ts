import { DeepMutable } from '@/utils/deepMutable';

type Pages = DeepMutable<typeof pages>;
type Path = keyof Pages;
type Page = Pages[keyof Pages][keyof Pages[keyof Pages]];

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
 },
} as const;

export type { Pages, Page, Path };
export { pages };
