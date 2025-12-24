'use client';
import { useEffect } from 'react';
import { axios } from '../../utils/defaultAxios';
import { useLoginContext } from './login/loginContext';

export default function LoginAxiosInterceptor() {
 const { changeLoginModalIsOpen } = useLoginContext();

 useEffect(() => {
  const checkTokenAvailability = () => {
   const interceptor = axios.interceptors.response.use(
    (response) => {
     return response;
    },
    async (error) => {
     if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
     ) {
      changeLoginModalIsOpen(true);
      console.error('Response error:', error.response);
     }
     return Promise.reject(error);
    },
   );

   return () => {
    axios.interceptors.response.eject(interceptor);
   };
  };
  const eject = checkTokenAvailability();
  return eject;
 }, [changeLoginModalIsOpen]);
 return <></>;
}
