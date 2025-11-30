'use client';
import { ReactNode } from 'react';
import { useNavigationContext } from '../../services/navigation/navigationContext';

export default function Main({ children }: { children: ReactNode }) {
 const { isOpen, toggle } = useNavigationContext();
 return (
  <main
   className={`relative grow bg-neutral-200 dark:bg-neutral-800 ${isOpen ? 'overflow-hidden' : 'overflow-auto'} lg:overflow-auto`}
  >
   {isOpen && (
    <div
     onClick={() => toggle(false)}
     className='fixed lg:hidden inset-0 bg-black/40 z-[calc(var(--panel-nav-zindex)-1px)]'
    ></div>
   )}
   {children}
  </main>
 );
}
