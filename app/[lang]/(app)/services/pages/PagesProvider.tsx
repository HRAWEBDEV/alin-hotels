'use client';
import { ReactNode } from 'react';
import { pagesContext } from './pagesContext';
import { pagesList } from './utils/pagesList';

export default function PagesProvider({ children }: { children: ReactNode }) {
 const ctx = {
  pagesList,
 };

 return <pagesContext.Provider value={ctx}>{children}</pagesContext.Provider>;
}
