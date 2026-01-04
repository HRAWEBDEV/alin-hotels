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
 loginDictionary,
 realPersonDictionary,
 usersDictionary,
}: {
 children: ReactNode;
} & ShareStore) {
 const ctx: ShareStore = {
  metaDictionary,
  shareDictionary,
  loginDictionary,
  usersDictionary,
  realPersonDictionary,
 };
 return (
  <shareDictionaryContext.Provider value={ctx}>
   {children}
  </shareDictionaryContext.Provider>
 );
}
