import { DeepMutable } from '@/utils/deepMutable';

type Pages = DeepMutable<typeof pages>;

const pages = {
 'general-settings': {
  users: {
   name: 'users',
  },
 },
} as const;

export type { Pages };
export { pages };
