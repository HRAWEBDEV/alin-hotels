'use client';
import { useState } from 'react';
import { ReactNode } from 'react';
import {
 type PersonsConfig,
 personsConfigContext,
 tabs,
} from './personsConfigContext';

export default function PersonsConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [selectedTab, setSelectedTab] =
  useState<PersonsConfig['selectedTab']>('list');

 function handleChangeTab(newTab?: PersonsConfig['selectedTab']) {
  setSelectedTab(() => (newTab === undefined ? 'list' : newTab));
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
