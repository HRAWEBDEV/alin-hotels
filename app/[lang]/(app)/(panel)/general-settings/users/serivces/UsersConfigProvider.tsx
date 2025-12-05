'use client';
import { useState } from 'react';
import { ReactNode } from 'react';
import {
 type UsersConfig,
 usersConfigContext,
 tabs,
} from './usersConfigContext';

export default function UsersConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [selectedTab, setSelectedTab] =
  useState<UsersConfig['selectedTab']>('list');

 function handleChangeTab(newTab?: UsersConfig['selectedTab']) {
  setSelectedTab(() => (newTab === undefined ? 'list' : newTab));
 }

 const ctx: UsersConfig = {
  tabs,
  selectedTab,
  changeSelectedTab: handleChangeTab,
 };
 return (
  <usersConfigContext.Provider value={ctx}>
   {children}
  </usersConfigContext.Provider>
 );
}
