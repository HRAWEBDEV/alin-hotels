'use client';
import { useEffect } from 'react';
import { type UserInfoContext, userInfoContext } from './userInfoContext';
import { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userInfoBasePath, getUserInfo } from './userInfoApiActions';
import Loading from '../../components/Loading';
import { toast } from 'sonner';
import useLogout from '../../../login/hooks/useLogout';

export default function UserInfoProvider({
 children,
}: {
 children: ReactNode;
}) {
 const logout = useLogout();
 // get user info
 const { data, isLoading, isFetching, isError, isSuccess, error } = useQuery({
  staleTime: Infinity,
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

 useEffect(() => {
  if (!isError) return;
  toast.error(error.message);
  logout();
 }, [isError, error, logout]);

 if (isLoading || !isSuccess) return <Loading />;

 return (
  <userInfoContext.Provider value={ctx}>{children}</userInfoContext.Provider>
 );
}
