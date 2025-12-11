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

export default function PersonsConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const router = useRouter();
 const { locale } = useBaseConfig();
 const searchParams = useSearchParams();
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

 const ctx: PersonsConfig = {
  tabs,
  selectedTab,
  changeSelectedTab: handleChangeTab,
 };
 return (
  <personsConfigContext.Provider value={ctx}>
   {children}
  </personsConfigContext.Provider>
 );
}
