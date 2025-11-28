import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
 return <main className='grow'>{children}</main>;
}
