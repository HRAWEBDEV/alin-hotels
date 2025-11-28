import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
 return (
  <main className='grow bg-neutral-200 dark:bg-neutral-800 overflow-auto'>
   {children}
  </main>
 );
}
