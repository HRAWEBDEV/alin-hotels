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
import { type Pagination } from '@/app/[lang]/(app)/utils/apiBaseTypes';

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
 const [pagination, setPagination] = useState<Pagination>({
  limit: 10,
  offset: 1,
 });
 function handleChangePagination(newValues: Pagination) {
  setPagination(newValues);
 }
 const {
  data: personsData,
  isLoading: personsLoading,
  isFetching: personsFetching,
  isError: personsError,
  isSuccess: personsSucess,
  refetch: refetchPersons,
 } = useQuery({
  queryKey: [realPersonsBasePath, 'all', pagination.limit, pagination.offset],
  async queryFn({ signal }) {
   const res = await getPagedRealPersons({
    signal,
    limit: 10,
    offset: 1,
   });
   return res.data;
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
   pagination,
   refetchPersons,
   onChangePagination: handleChangePagination,
  },
 };
 return (
  <personsConfigContext.Provider value={ctx}>
   {children}
  </personsConfigContext.Provider>
 );
}
