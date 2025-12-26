'use client';
import { useEffect, useState } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { ReactNode } from 'react';
import {
 type PersonsConfig,
 personsConfigContext,
 tabs,
} from './personsConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 getInitialData,
 realPersonsBasePath,
 getPagedRealPersons,
 removeRealPerson,
} from './personsApiActions';
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
 type RealPersonSchema,
 defaultValues,
 createRealPersonSchema,
} from '../schemas/realPersonSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@tanstack/react-pacer';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default function PersonsConfigProvider({
 children,
 dic,
 ...wrapperType
}: {
 children: ReactNode;
 dic: RealPersonsDictionary;
} & WrapperTypes) {
 // queries
 const router = useRouter();
 const searchParams = useSearchParams();
 const activeTabQuery = searchParams.get(
  'activeTab',
 ) as PersonsConfig['selectedTab'];
 const nameQuery = searchParams.get('name');
 const fatherNameQuery = searchParams.get('fatherName');
 const nationalCodeQuery = searchParams.get('nationalCode');
 const mobileNoQuery = searchParams.get('mobileNo');
 const emailQuery = searchParams.get('email');
 const genderIDQuery = searchParams.get('genderID');
 const genderNameQuery = searchParams.get('genderName');
 const nationalityIDQuery = searchParams.get('nationalityID');
 const nationalityNameQuery = searchParams.get('nationalityName');
 // filters setup
 const realPersonFilters = useForm<RealPersonSchema>({
  resolver: zodResolver(createRealPersonSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   name: nameQuery || '',
   fatherName: fatherNameQuery || '',
   mobileNo: mobileNoQuery || '',
   email: emailQuery || '',
   nationalCode: nationalCodeQuery || '',
   gender:
    genderIDQuery && genderNameQuery
     ? {
        key: genderIDQuery,
        value: genderNameQuery,
       }
     : null,
   nationality:
    nationalityIDQuery && nationalityNameQuery
     ? {
        key: nationalityIDQuery,
        value: nationalityNameQuery,
       }
     : null,
  },
 });
 const [
  nameValue,
  fatherNameValue,
  nationalCodeValue,
  mobileNoValue,
  emailValue,
  genderValue,
  nationalityValue,
 ] = realPersonFilters.watch([
  'name',
  'fatherName',
  'nationalCode',
  'mobileNo',
  'email',
  'gender',
  'nationality',
 ]);
 const [nameDbValue] = useDebouncedValue(nameValue, {
  wait: 500,
 });
 const [fatherNameDbValue] = useDebouncedValue(fatherNameValue, {
  wait: 500,
 });
 const [nationalCodeDbValue] = useDebouncedValue(nationalCodeValue, {
  wait: 500,
 });
 const [mobileNoDbValue] = useDebouncedValue(mobileNoValue, {
  wait: 500,
 });
 const [emailDbValue] = useDebouncedValue(emailValue, {
  wait: 500,
 });
 //
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] = useState<PersonsConfig['selectedTab']>(
  activeTabQuery || 'list',
 );
 const [selectedPersonID, setSelectedPersonID] = useState<number | null>(null);
 const [showRemovePersonConfirm, setShowRemovePersonConfirm] = useState(false);

 function handleChangeTab(newTab?: PersonsConfig['selectedTab']) {
  const activeTab = newTab === undefined ? 'list' : newTab;
  setSelectedTab(activeTab);
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('activeTab', activeTab);
  router.replace(
   `/${locale}/general-settings/real-persons?${newSearchParams.toString()}`,
  );
 }

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }
 // data
 const [pagination, setPagination] = useState<PaginationState>({
  pageIndex: 0,
  pageSize: 11,
 });
 // init data
 const {
  data: initialData,
  isLoading: initialDataLoading,
  isError: initialDataError,
  isSuccess: initialDataSuccess,
 } = useQuery({
  staleTime: 'static',
  queryKey: [realPersonsBasePath, 'initial-data'],

  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // data
 const {
  data: personsData,
  isLoading: personsLoading,
  isFetching: personsFetching,
  isError: personsError,
  isSuccess: personsSucess,
  refetch: refetchPersons,
 } = useQuery({
  placeholderData: keepPreviousData,
  queryKey: [
   realPersonsBasePath,
   'all',
   pagination.pageSize,
   pagination.pageIndex,
   nameDbValue,
   fatherNameDbValue,
   nationalCodeDbValue,
   mobileNoDbValue,
   emailDbValue,
   nationalityValue?.key || 'all',
   genderValue?.key || 'all',
  ],
  async queryFn({ signal }) {
   const res = await getPagedRealPersons({
    signal,
    email: emailDbValue,
    fatherName: fatherNameDbValue,
    name: nameDbValue,
    nationalCode: nationalCodeDbValue,
    genderID: genderValue?.key,
    nationalityZoneID: nationalityValue?.key,
    mobileNo: mobileNoDbValue,
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
 function handleChangeSelectedPersonID(id: number | null) {
  setSelectedPersonID(id);
 }
 // remove person
 function handleRemovePerson(personID: number) {
  setShowRemovePersonConfirm(true);
  setSelectedPersonID(personID);
 }

 const { mutate: confirmRemovePerson, isPending: removePersonIsPending } =
  useMutation({
   async mutationFn() {
    return removeRealPerson(selectedPersonID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [realPersonsBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [realPersonsBasePath, 'person', selectedPersonID!.toString()],
    });
    setSelectedPersonID(null);
    setSelectedTab('list');
    setShowRemovePersonConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //
 function handleEditPerson(id: number) {
  setSelectedPersonID(id);
  setSelectedTab('edit');
 }
 //
 const handleNewPersonSuccess: PersonsConfig['persons']['onNewPersonSuccess'] =
  ({ mode }) => {
   if (mode === 'edit') {
    setSelectedTab('list');
    setSelectedPersonID(null);
   }
  };
 const handleCancelPerson: PersonsConfig['persons']['onCancelNewPerson'] = ({
  mode,
 }) => {
  if (mode === 'edit') {
   setSelectedPersonID(null);
  }
  setSelectedTab('list');
 };

 // set queries
 useEffect(() => {
  const newSearchParams = new URLSearchParams(location.search);
  newSearchParams.set('name', nameDbValue);
  newSearchParams.set('fatherName', fatherNameDbValue);
  newSearchParams.set('mobileNo', mobileNoDbValue);
  newSearchParams.set('email', emailDbValue);
  newSearchParams.set('genderID', genderValue?.key || '');
  newSearchParams.set('genderName', genderValue?.value || '');
  newSearchParams.set('nationalityID', nationalityValue?.key || '');
  newSearchParams.set('nationalityName', nationalityValue?.value || '');
  newSearchParams.set('nationalCode', nationalCodeValue || '');
  router.replace(
   `/${locale}/general-settings/real-persons?${newSearchParams.toString()}`,
  );
 }, [
  nameDbValue,
  fatherNameDbValue,
  mobileNoDbValue,
  emailDbValue,
  genderValue,
  nationalityValue,
  nationalCodeValue,
  locale,
  router,
 ]);

 const ctx: PersonsConfig = {
  wrapperType: wrapperType,
  tabs,
  selectedTab,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  changeSelectedTab: handleChangeTab,
  initialData: {
   data: initialData,
   isLoading: initialDataLoading,
   isError: initialDataError,
   isSuccess: initialDataSuccess,
  },
  persons: {
   queries: {
    name: nameDbValue,
    email: emailDbValue,
    fatherName: fatherNameDbValue,
    mobileNo: mobileNoDbValue,
    nationalCode: nationalCodeDbValue,
   },
   data: personsData,
   isError: personsError,
   isFetching: personsFetching,
   isLoading: personsLoading,
   isSuccess: personsSucess,
   selectedPersonID,
   pagination,
   refetchPersons,
   onChangePagination: setPagination,
   onChangeSelectedPersonID: handleChangeSelectedPersonID,
   onRemovePerson: handleRemovePerson,
   onEditPerson: handleEditPerson,
   onNewPersonSuccess: handleNewPersonSuccess,
   onCancelNewPerson: handleCancelPerson,
  },
 };

 return (
  <personsConfigContext.Provider value={ctx}>
   <FormProvider {...realPersonFilters}>{children}</FormProvider>
   <Dialog
    open={showRemovePersonConfirm}
    onOpenChange={(newValue) => setShowRemovePersonConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removePerson.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removePerson.confirmRemovePerson}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removePerson.confirmRemovePerson}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removePersonIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removePersonIsPending && <Spinner />}
        {dic.removePerson.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removePersonIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemovePerson();
       }}
      >
       {removePersonIsPending && <Spinner />}
       {dic.removePerson.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </personsConfigContext.Provider>
 );
}
