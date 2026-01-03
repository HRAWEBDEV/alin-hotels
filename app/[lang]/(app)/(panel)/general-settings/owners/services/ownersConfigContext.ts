import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type Owner, type GetOwnerProps } from './ownersApiActions';

interface OwnersConfig {
 owners: {
  queries: Omit<GetOwnerProps, 'signal'>;
  data?: Owner[];
  filteredData?: Owner[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedOwnerID: number | null;
  refetchOwners: () => unknown;
  onRemoveOwner: (personID: number) => unknown;
 };
}

const ownersConfigContext = createContext<OwnersConfig | null>(null);

function useOwnersConfigContext() {
 const val = use(ownersConfigContext);
 if (!val) throw new OutOfContext('ownersConfigContext');
 return val;
}

export type { OwnersConfig };
export { ownersConfigContext, useOwnersConfigContext };
