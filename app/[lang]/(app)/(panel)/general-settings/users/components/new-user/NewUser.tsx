'use client';
import { useEffect } from 'react';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type UserSchema,
 createUserSchema,
 defaultValues,
} from '../../schemas/userSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveUserPackage,
 usersBasePath,
 saveUser,
 getUser,
 updateUser,
} from '../../services/usersApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type UsersConfig } from '../../services/usersConfigContext';

export default function NewUser({
 dic,
 userID,
 onSuccess,
}: {
 dic: UsersDictionary;
 userID?: number | null;
 realPersonDic: RealPersonsDictionary;
 onSuccess?: UsersConfig['users']['onNewUserSuccess'];
 onCancel?: UsersConfig['users']['onCancelNewUser'];
}) {
 const queryClient = useQueryClient();
 // form
 const { reset } = useForm<UserSchema>({
  resolver: zodResolver(createUserSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const {} = useMutation({
  mutationFn({}: UserSchema) {
   const newUser: SaveUserPackage = {
    personID: 0,
   };
   return userID ? updateUser(newUser) : saveUser(newUser);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [usersBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: userID ? 'edit' : 'add',
     userID: res.data,
    });
   }
   if (userID) {
    queryClient.invalidateQueries({
     queryKey: [usersBasePath, 'user', userID.toString()],
    });
   } else {
    toast.success(dic.newUser.newUserAdded);
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { isLoading, isError } = useQuery({
  enabled: !!userID,
  queryKey: [usersBasePath, 'user', userID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getUser({ signal, userID: userID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!userID) return;
  reset();
 }, [userID, reset]);

 if (userID && isError) return <NoItemFound />;
 if (userID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(35rem,100%)] mx-auto'></form>
 );
}
