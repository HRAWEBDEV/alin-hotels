'use client';
import { ReactNode, useState } from 'react';
import { navigationContext } from './navigationContext';

export default function NavigationProvider({
 children,
}: {
 children: ReactNode;
}) {
 const [isOpen, setIsOpen] = useState(false);

 function handleToggleNav(open?: boolean) {
  setIsOpen((pre) => (open === undefined ? !pre : open));
 }
 const ctx = {
  isOpen,
  toggle: handleToggleNav,
 };

 return (
  <navigationContext.Provider value={ctx}>
   {children}
  </navigationContext.Provider>
 );
}
