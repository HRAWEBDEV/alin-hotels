import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { Pages } from '../../../services/pages/utils/pagesList';

interface Navigator {
 activePath: keyof Pages | '';
 activeMenu: Pages[keyof Pages][keyof Pages[keyof Pages]] | null;
}

const navigatorContext = createContext<Navigator | null>(null);

function useNavigatorContext() {
 const val = use(navigatorContext);
 if (!val) throw new OutOfContext('navigatorContext');
 return val;
}

export type { Navigator };
export { navigatorContext, useNavigatorContext };
