'use client';
import { useEffect, useState } from 'react';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { ReactNode } from 'react';
import {
 type UsersConfig,
 usersConfigContext,
 tabs,
} from './usersConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { usersBasePath, getPagedUsers, removeUser } from './usersApiActions';
import {
 useQuery,
 useMutation,
 useQueryClient,
 keepPreviousData,
} from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogDescription,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { IoIosWarning } from 'react-icons/io';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type UserSchema,
 defaultValues,
 createUserSchema,
} from '../schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@tanstack/react-pacer';
import { type WrapperTypes } from '../utils/wrapperTypes';
import { useUserProfileContext } from '../../../services/user-profile/userProfileContext';

export default function UsersConfigProvider({
 children,
 dic,
 ...wrapperType
}: {
 children: ReactNode;
 dic: UsersDictionary;
} & WrapperTypes) {
 const { settingsPreferences } = useUserProfileContext();
 // queries
 const router = useRouter();
 const searchParams = useSearchParams();
 const activeTabQuery = searchParams.get(
  'activeTab',
 ) as UsersConfig['selectedTab'];
 const userNameValueQuery = searchParams.get('userName');
 const nameValueQuery = searchParams.get('name');
 const phoneNumberValueQuery = searchParams.get('phoneNumber');
 const paginationIndexQuery = searchParams.get('paginationIndex');
 const paginationSizeQuery =
  searchParams.get('paginationSize') ||
  settingsPreferences.ui.gridLimitSizeOption.toString();

 // filters setup
 const userFilters = useForm<UserSchema>({
  resolver: zodResolver(createUserSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   ...(() => {
    if (wrapperType.mode === 'find') return {};
    return {
     userName: userNameValueQuery || '',
     name: nameValueQuery || '',
     phoneNumber: phoneNumberValueQuery || '',
    };
   })(),
  },
 });
 const [userNameValue, nameValue, phoneNumberValue] = userFilters.watch([
  'userName',
  'name',
  'phoneNumber',
 ]);

 const [userNameDbValue] = useDebouncedValue(userNameValue, {
  wait: 500,
 });
 const [nameDbValue] = useDebouncedValue(nameValue, {
  wait: 500,
 });
 const [phoneNumberDbValue] = useDebouncedValue(phoneNumberValue, {
  wait: 500,
 });
 //
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] = useState<UsersConfig['selectedTab']>(
  activeTabQuery || 'list',
 );
 const [selectedUserID, setSelectedUserID] = useState<number | null>(null);
 const [showRemoveUserConfirm, setShowRemoveUserConfirm] = useState(false);

 function handleChangeTab(newTab?: UsersConfig['selectedTab']) {
  const activeTab = newTab === undefined ? 'list' : newTab;
  setSelectedTab(activeTab);
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('activeTab', activeTab);
  router.replace(
   `/${locale}/general-settings/users?${newSearchParams.toString()}`,
  );
 }

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }
 // data
 const [pagination, setPagination] = useState<PaginationState>(() => {
  const pageIndex = paginationIndexQuery ? Number(paginationIndexQuery) : 0;
  const pageSize = paginationSizeQuery ? Number(paginationSizeQuery) : 10;
  return {
   pageIndex: pageIndex,
   pageSize: pageSize,
  };
 });
 // data
 const {
  data: usersData,
  isLoading: usersLoading,
  isFetching: usersFetching,
  isError: usersError,
  isSuccess: usersSucess,
  refetch: refetchUsers,
 } = useQuery({
  placeholderData: keepPreviousData,
  queryKey: [
   usersBasePath,
   'all',
   pagination.pageSize,
   pagination.pageIndex,
   userNameDbValue,
   nameDbValue,
   phoneNumberDbValue,
  ],
  async queryFn({ signal }) {
   const res = await getPagedUsers({
    signal,
    userName: userNameDbValue,
    personName: nameDbValue,
    phoneNumber: phoneNumberDbValue,
    limit: pagination.pageSize,
    offset: pagination.pageIndex + 1,
   });

   if (!res.data || !res.data.limit) return;
   const allPages = Math.ceil(res.data.rowsCount / res.data.limit);
   const actviePage = pagination.pageIndex + 1;
   if (allPages && actviePage > allPages) {
    setPagination((pre) => ({
     ...pre,
     pageIndex: allPages - 1,
    }));
   }
   return res.data;
  },
 });
 // change person
 function handleChangeSelectedUserID(id: number | null) {
  setSelectedUserID(id);
 }
 // remove person
 function handleRemoveUser(userID: number) {
  setShowRemoveUserConfirm(true);
  setSelectedUserID(userID);
 }

 const { mutate: confirmRemoveUser, isPending: removeUserIsPending } =
  useMutation({
   async mutationFn() {
    return removeUser(selectedUserID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [usersBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [usersBasePath, 'user', selectedUserID!.toString()],
    });
    setSelectedUserID(null);
    setSelectedTab('list');
    setShowRemoveUserConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //
 function handleEditUser(id: number) {
  setSelectedUserID(id);
  setSelectedTab('edit');
 }
 //
 const handleNewUserSuccess: UsersConfig['users']['onNewUserSuccess'] = ({
  mode,
 }) => {
  if (mode === 'edit') {
   setSelectedTab('list');
   setSelectedUserID(null);
  }
 };
 const handleCancelUser: UsersConfig['users']['onCancelNewUser'] = ({
  mode,
 }) => {
  if (mode === 'edit') {
   setSelectedUserID(null);
  }
  setSelectedTab('list');
 };

 // set queries
 useEffect(() => {
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(location.search);
  newSearchParams.set('paginationSize', pagination.pageSize.toString());
  newSearchParams.set('paginationIndex', pagination.pageIndex.toString());
  newSearchParams.set('userName', userNameDbValue);
  newSearchParams.set('name', nameDbValue);
  newSearchParams.set('phoneNumber', phoneNumberDbValue);
  router.replace(
   `/${locale}/general-settings/users?${newSearchParams.toString()}`,
  );
 }, [
  wrapperType.mode,
  locale,
  router,
  pagination,
  userNameDbValue,
  nameDbValue,
  phoneNumberDbValue,
 ]);

 // set queries
 useEffect(() => {
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(location.search);
  newSearchParams.set('userName', userNameValue);
  router.replace(
   `/${locale}/general-settings/users?${newSearchParams.toString()}`,
  );
 }, [wrapperType.mode, locale, router, pagination, userNameValue]);

 const ctx: UsersConfig = {
  wrapperType: wrapperType,
  tabs,
  selectedTab,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  changeSelectedTab: handleChangeTab,
  users: {
   queries: {
    userName: userNameDbValue,
    personName: nameDbValue,
    phoneNumber: phoneNumberDbValue,
   },
   data: usersData,
   isError: usersError,
   isFetching: usersFetching,
   isLoading: usersLoading,
   isSuccess: usersSucess,
   selectedUserID,
   pagination,
   refetchUsers,
   onChangePagination: setPagination,
   onChangeSelectedUserID: handleChangeSelectedUserID,
   onRemoveUser: handleRemoveUser,
   onEditUser: handleEditUser,
   onNewUserSuccess: handleNewUserSuccess,
   onCancelNewUser: handleCancelUser,
  },
 };

 return (
  <usersConfigContext.Provider value={ctx}>
   <FormProvider {...userFilters}>{children}</FormProvider>
   <Dialog
    open={showRemoveUserConfirm}
    onOpenChange={(newValue) => setShowRemoveUserConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeUser.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeUser.confirmRemoveUser}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeUser.confirmRemoveUser}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeUserIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeUserIsPending && <Spinner />}
        {dic.removeUser.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeUserIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveUser();
       }}
      >
       {removeUserIsPending && <Spinner />}
       {dic.removeUser.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </usersConfigContext.Provider>
 );
}
