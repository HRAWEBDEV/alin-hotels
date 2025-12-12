'use client';
import { ReactNode, useState } from 'react';
import {
 type QuickAccess,
 type QuickAccessItem,
 quickAccessContext,
} from './quickAccessContext';

export default function QuickAccessProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [quickAccessItems, setQuickAccessItems] = useState<QuickAccessItem[]>(
  [],
 );

 function addItem(
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page'],
 ) {
  setQuickAccessItems((pre) => {
   return [
    ...pre,
    {
     id: (path + '-' + page.name) as QuickAccessItem['id'],
     path,
     page,
    },
   ];
  });
 }

 function removeItem(id: QuickAccessItem['id']) {
  setQuickAccessItems((pre) => pre.filter((item) => item.id !== id));
 }

 function isMarked(
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page']['name'],
 ): boolean {
  console.log();
  return !!quickAccessItems.find((item) => item.id === `${path}-${page}`);
 }

 const ctx: QuickAccess = {
  list: quickAccessItems,
  addItem,
  removeItem,
  isMarked,
 };

 return (
  <quickAccessContext.Provider value={ctx}>
   {children}
  </quickAccessContext.Provider>
 );
}
