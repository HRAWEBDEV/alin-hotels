import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

interface UserInfo {
 loggedIn: boolean;
}

const userInfoContext = createContext<UserInfo | null>(null);

function useUserInfoContext() {
 const val = use(userInfoContext);
 if (!val) throw new OutOfContext('userInfoContext');
 return val;
}

export type { UserInfo };
export { userInfoContext, useUserInfoContext };
