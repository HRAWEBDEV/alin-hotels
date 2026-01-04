import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';
import { type ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import { type MetaDictionary } from '@/internalization/app/dictionaries/meta/dictionary';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';

interface ShareStore {
 shareDictionary: ShareDictionary;
 metaDictionary: MetaDictionary;
 loginDictionary: LoginDictionary;
 realPersonDictionary: RealPersonsDictionary;
 usersDictionary: UsersDictionary;
}

const shareDictionaryContext = createContext<ShareStore | null>(null);

function useShareDictionary() {
 const val = use(shareDictionaryContext);
 if (!val) throw new OutOfContext('shareDictionaryContext');
 return val;
}

export type { ShareStore };
export { shareDictionaryContext, useShareDictionary };
