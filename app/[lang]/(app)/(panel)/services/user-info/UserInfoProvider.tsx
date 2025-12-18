'use client';
import { userInfoContext } from './userInfoContext';
import { ReactNode } from 'react';

// here we need a api aciton to check user info and then render panel
export default function UserInfoProvider({
 children,
}: {
 children: ReactNode;
}) {
 return (
  <userInfoContext.Provider
   value={{
    loggedIn: true,
   }}
  >
   {children}
  </userInfoContext.Provider>
 );
}
