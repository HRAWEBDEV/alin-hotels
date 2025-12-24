'use client';
import { type UserInfoContext, userInfoContext } from './userInfoContext';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userInfoBasePath, getUserInfo } from './userInfoApiActions';
import Loading from '../../components/Loading';

export default function UserInfoProvider({
 children,
}: {
 children: ReactNode;
}) {
 // get user info
 const { data, isLoading, isFetching, isError, isSuccess } = useQuery({
  staleTime: 'static',
  gcTime: 0,
  queryKey: [userInfoBasePath],
  async queryFn({ signal }) {
   const res = await getUserInfo({ signal });
   return res.data;
  },
 });

 const ctx: UserInfoContext = {
  data: data!,
  isLoading,
  isError,
  isFetching,
 };

 if (isLoading || !isSuccess) return <Loading />;

 return (
  <userInfoContext.Provider value={ctx}>{children}</userInfoContext.Provider>
 );
}
