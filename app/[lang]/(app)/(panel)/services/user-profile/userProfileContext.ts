import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

const userProfileTabs = [
 'generalInfo',
 'quickAccess',
 'notifications',
 'support',
 'setting',
] as const;

type UserPorifleTab = (typeof userProfileTabs)[number];

interface UserProfile {
 isOpen: boolean;
 activeTabType: UserPorifleTab;
 toggle: (params: { open?: boolean; type?: UserPorifleTab }) => unknown;
}

const userProfileContext = createContext<null | UserProfile>(null);

function useUserProfileContext() {
 const val = use(userProfileContext);
 if (!val) throw new OutOfContext('settingContext');
 return val;
}

export type { UserProfile, UserPorifleTab };
export { userProfileContext, userProfileTabs, useUserProfileContext };
