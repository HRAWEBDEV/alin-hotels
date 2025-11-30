'use client';
import { ReactNode } from 'react';
import { useNavigationContext } from '../../services/navigation/navigationContext';

export default function NavWrapper({ children }: { children: ReactNode }) {
 const { isOpen } = useNavigationContext();
 return (
  <>
   <nav
    className={`fixed transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-(--panel-nav-width)'} lg:translate-x-0 z-(--panel-nav-zindex) lg:z-auto top-0 bottom-0 start-0 lg:sticky flex flex-col shrink-0 w-(--panel-nav-width) bg-primary dark:bg-sky-950 text-primary-foreground dark:text-foreground overflow-hidden`}
   >
    {children}
   </nav>
  </>
 );
}
