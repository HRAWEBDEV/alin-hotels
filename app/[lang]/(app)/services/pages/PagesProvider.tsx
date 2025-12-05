'use client';
import { ReactNode } from 'react';
import { pagesContext } from './pagesContext';
import { Pages, pages } from './utils/pagesList';

export default function PagesProvider({ children }: { children: ReactNode }) {
 const ctx = {
  pages: pages as Pages,
 };

 return <pagesContext.Provider value={ctx}>{children}</pagesContext.Provider>;
}
