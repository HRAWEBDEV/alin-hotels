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
   const lastItem = pre.at(-1);
   const newId = lastItem?.id || 0;
   return [
    ...pre,
    {
     id: newId + 1,
     path,
     page,
    },
   ];
  });
 }

 function removeItem(id: number) {
  setQuickAccessItems((pre) => pre.filter((item) => item.id !== id));
 }

 const ctx: QuickAccess = {
  list: quickAccessItems,
  addItem,
  removeItem,
 };

 return (
  <quickAccessContext.Provider value={ctx}>
   {children}
  </quickAccessContext.Provider>
 );
}
