import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type Path, type Page } from '../../../services/pages/utils/pagesList';

interface Navigator {
 activePath: Path | '';
 activeMenu: Page | null;
}

const navigatorContext = createContext<Navigator | null>(null);

function useNavigatorContext() {
 const val = use(navigatorContext);
 if (!val) throw new OutOfContext('navigatorContext');
 return val;
}

export type { Navigator };
export { navigatorContext, useNavigatorContext };
