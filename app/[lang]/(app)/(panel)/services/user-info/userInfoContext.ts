import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';
import { type UserInfo } from './userInfoApiActions';

interface UserInfoContext {
 data: UserInfo;
 isLoading: boolean;
 isFetching: boolean;
 isError: boolean;
}

const userInfoContext = createContext<UserInfoContext | null>(null);

function useUserInfoContext() {
 const val = use(userInfoContext);
 if (!val) throw new OutOfContext('userInfoContext');
 return val;
}

export type { UserInfoContext };
export { userInfoContext, useUserInfoContext };
