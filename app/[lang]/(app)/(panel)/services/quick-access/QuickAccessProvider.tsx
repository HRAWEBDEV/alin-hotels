'use client';
import { ReactNode, useState, useEffect } from 'react';
import {
 type QuickAccess,
 type QuickAccessItem,
 quickAccessContext,
} from './quickAccessContext';
import {
 getStorageQuickAccessItems,
 setStorageQuickAccessItems,
} from './quickAccessStorageManager';

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
  if (isMarked(path, page.name)) return;
  const newItems = [
   ...quickAccessItems,
   {
    id: (path + '-' + page.name) as QuickAccessItem['id'],
    path,
    page,
   },
  ];
  setStorageQuickAccessItems(newItems);
  setQuickAccessItems(newItems);
 }

 function removeItem(id: QuickAccessItem['id']) {
  const filteredItems = quickAccessItems.filter((item) => item.id !== id);
  setStorageQuickAccessItems(filteredItems);
  setQuickAccessItems(filteredItems);
 }

 function isMarked(
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page']['name'],
 ): boolean {
  return !!quickAccessItems.find((item) => item.id === `${path}-${page}`);
 }

 function pathExist(path: QuickAccessItem['path']): boolean {
  return quickAccessItems.some((item) => item.path === path);
 }

 const ctx: QuickAccess = {
  list: quickAccessItems,
  addItem,
  removeItem,
  isMarked,
  pathExist,
 };

 useEffect(() => {
  setQuickAccessItems(getStorageQuickAccessItems());
 }, []);

 return (
  <quickAccessContext.Provider value={ctx}>
   {children}
  </quickAccessContext.Provider>
 );
}
