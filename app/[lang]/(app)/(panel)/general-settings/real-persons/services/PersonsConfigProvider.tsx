'use client';
import { useState } from 'react';
import { ReactNode } from 'react';
import {
 type PersonsConfig,
 personsConfigContext,
 tabs,
} from './personsConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { realPersonsBasePath, getPagedRealPersons } from './personsApiActions';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

export default function PersonsConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const router = useRouter();
 const { locale } = useBaseConfig();
 const searchParams = useSearchParams();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] =
  useState<PersonsConfig['selectedTab']>('list');
 const [selectedPersonID, setSelectedPersonID] = useState<number | null>(null);

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
 //
 function handleChangeSelectedPersonID(id: number | null) {
  setSelectedPersonID(id);
 }

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
  },
 };
 return (
  <personsConfigContext.Provider value={ctx}>
   {children}
  </personsConfigContext.Provider>
 );
}
