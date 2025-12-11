'use client';
import { ReactNode, useState, useEffect } from 'react';
import { type History, historyContext } from './historyTrackerContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function HistoryTrakcer({ children }: { children: ReactNode }) {
 const pathname = usePathname();
 const router = useRouter();
 const searchParams = useSearchParams();
 const searchQueryStr = searchParams.toString();
 const [historyList, setHistoryList] = useState<
  {
   path: string;
   search: string;
  }[]
 >([]);
 const canGoBack = historyList.length > 1;
 const activeHistory = historyList.at(-1);

 function handleGoBack() {
  if (!canGoBack) return;
  setHistoryList((pre) => pre.slice(0, -2));
 }

 const ctx: History = {
  canGoBack,
  goBack: handleGoBack,
 };

 return (
  <historyContext.Provider value={ctx}>{children}</historyContext.Provider>
 );
}
