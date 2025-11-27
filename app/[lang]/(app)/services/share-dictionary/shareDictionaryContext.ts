import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';
import { type ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import { type MetaDictionary } from '@/internalization/app/dictionaries/meta/dictionary';

interface ShareStore {
 shareDictionary: ShareDictionary;
 metaDictionary: MetaDictionary;
}

const shareDictionaryContext = createContext<ShareStore | null>(null);

function useShareDictionary() {
 const val = use(shareDictionaryContext);
 if (!val) throw new OutOfContext('shareDictionaryContext');
 return val;
}

export type { ShareStore };
export { shareDictionaryContext, useShareDictionary };
