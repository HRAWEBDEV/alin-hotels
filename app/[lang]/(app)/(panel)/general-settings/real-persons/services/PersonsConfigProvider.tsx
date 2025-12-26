'use client';
import { useState } from 'react';
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
 realPersonsBasePath,
 getPagedRealPersons,
 removeRealPerson,
} from './personsApiActions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export default function PersonsConfigProvider({
 children,
 dic,
}: {
 children: ReactNode;
 dic: RealPersonsDictionary;
}) {
 const queryClient = useQueryClient();
 const router = useRouter();
 const { locale } = useBaseConfig();
 const searchParams = useSearchParams();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] =
  useState<PersonsConfig['selectedTab']>('list');
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

 const {
  data: personsData,
  isLoading: personsLoading,
  isFetching: personsFetching,
  isError: personsError,
  isSuccess: personsSucess,
  refetch: refetchPersons,
 } = useQuery({
  queryKey: [
   realPersonsBasePath,
   'all',
   pagination.pageSize,
   pagination.pageIndex,
  ],
  async queryFn({ signal }) {
   const res = await getPagedRealPersons({
    signal,
    limit: pagination.pageSize,
    offset: pagination.pageIndex + 1,
   });
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

 const ctx: PersonsConfig = {
  tabs,
  selectedTab,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  changeSelectedTab: handleChangeTab,
  persons: {
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
  },
 };
 return (
  <personsConfigContext.Provider value={ctx}>
   {children}
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
