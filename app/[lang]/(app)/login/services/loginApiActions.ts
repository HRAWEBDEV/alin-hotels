import { axios } from '../../utils/defaultAxios';

interface LoginWithPasswordCredentials {
 userName: string;
 password: string;
}

function loginWithPassword(credentials: LoginWithPasswordCredentials) {
 return axios.post<{ item1: string; item2: number }>(
  '/HotelsUnion/Authentication/Signin',
  credentials,
 );
}

export type { LoginWithPasswordCredentials };
export { loginWithPassword };
