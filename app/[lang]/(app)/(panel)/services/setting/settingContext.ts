import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

interface Setting {
 isOpen: boolean;
 toggle: (open?: boolean) => unknown;
}

const settingContext = createContext<null | Setting>(null);

function useSettingContext() {
 const val = use(settingContext);
 if (!val) throw new OutOfContext('settingContext');
 return val;
}

export type { Setting };

export { settingContext, useSettingContext };
