'use client';
import { ReactNode } from 'react';
import {
 type ShareStore,
 shareDictionaryContext,
} from './shareDictionaryContext';

export default function ShareDictionaryProvider({
 children,
 metaDictionary,
 shareDictionary,
}: {
 children: ReactNode;
} & ShareStore) {
 const ctx: ShareStore = {
  metaDictionary,
  shareDictionary,
 };
 return (
  <shareDictionaryContext.Provider value={ctx}>
   {children}
  </shareDictionaryContext.Provider>
 );
}
