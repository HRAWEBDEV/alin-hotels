'use client';
import { ReactNode, useState } from 'react';
import { type History, historyContext } from './historyTrackerContext';
import { useRouter } from 'next/navigation';

export default function HistoryTrakcer({ children }: { children: ReactNode }) {
 const [canGoBack] = useState(true);
 const router = useRouter();

 function handleGoBack() {
  if (!canGoBack) return;
  router.back();
 }

 const ctx: History = {
  canGoBack,
  goBack: handleGoBack,
 };

 return (
  <historyContext.Provider value={ctx}>{children}</historyContext.Provider>
 );
}
