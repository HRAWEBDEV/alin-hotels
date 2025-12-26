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

function sendForgetPasswordOTPCode(phoneNo: string) {
 return axios.get(
  `/HotelsUnion/Authentication/SendRecoverOTP?phoneNumber=${phoneNo}`,
 );
}

function confirmOTPCode(props: { phoneNumber: string; securityStamp: string }) {
 return axios.post('/HotelsUnion/Authentication/ConfirmOTP', props);
}

function changePassword(props: {
 phoneNumber: string;
 securityStamp: string;
 newPassword: string;
 confirmNewPassword: string;
}) {
 return axios.post('/HotelsUnion/Authentication/ChangePassword', props);
}

export type { LoginWithPasswordCredentials };
export {
 loginWithPassword,
 sendForgetPasswordOTPCode,
 confirmOTPCode,
 changePassword,
};
