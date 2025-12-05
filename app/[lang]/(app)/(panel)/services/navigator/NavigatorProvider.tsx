'use client';
import { type Pages, pages } from '../../../services/pages/utils/pagesList';
import { ReactNode } from 'react';
import { type Navigator, navigatorContext } from './navigatorContext';
import { usePathname } from 'next/navigation';

export default function NavigatorProvider({
 children,
}: {
 children: ReactNode;
}) {
 const pathname = usePathname();
 const pathSegments = pathname.split('/');

 const activePath = (pathSegments.at(2) as keyof Pages) || '';
 const activePage = pages[activePath] || '';
 const activeMenu = activePage
  ? activePage[pathSegments.at(3) as keyof Pages[keyof Pages]]
  : null;

 const ctx: Navigator = {
  activePath,
  activeMenu,
 };

 return (
  <navigatorContext.Provider value={ctx}>{children}</navigatorContext.Provider>
 );
}
