import { axios } from '../../../utils/defaultAxios';

interface UserInfo {
 personID: number;
 userName: string;
 createDateTime: '2025-11-27T17:45:53+03:30';
 name: string;
 lastName: string;
 personFullName: string;
 phoneNumber: string;
}

const userInfoBasePath = '/HotelsUnion/Authentication/GetSignedinUserInfo';

function getUserInfo({ signal }: { signal: AbortSignal }) {
 return axios.get<UserInfo>(userInfoBasePath, {
  signal,
 });
}

export type { UserInfo };
export { userInfoBasePath, getUserInfo };
