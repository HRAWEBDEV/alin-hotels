import { DeepMutable } from '@/utils/deepMutable';

type Pages = DeepMutable<typeof pages>;
type Path = keyof Pages;
type Page = {
 [P in Path]: Pages[P][keyof Pages[P]];
}[Path];

const pages = {
 'hotel-information': {
  hotels: {
   name: 'hotels',
  },
 },
 'general-settings': {
  'real-persons': {
   name: 'real-persons',
  },
  companies: {
   name: 'companies',
  },
  users: {
   name: 'users',
  },
  owners: {
   name: 'owners',
  },
 },
 config: {
  'sms-panel-config': {
   name: 'sms-panel-config',
  },
 },
} as const;

export type { Pages, Page, Path };
export { pages };
