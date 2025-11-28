import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

interface UserProfile {
 isOpen: boolean;
 toggle: (open?: boolean) => unknown;
}

const userProfileContext = createContext<null | UserProfile>(null);

function useUserProfileContext() {
 const val = use(userProfileContext);
 if (!val) throw new OutOfContext('settingContext');
 return val;
}

export type { UserProfile };
export { userProfileContext, useUserProfileContext };
