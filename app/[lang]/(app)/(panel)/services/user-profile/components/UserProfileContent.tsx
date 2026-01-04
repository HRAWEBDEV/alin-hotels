'use client';
import NewPerson from '../../../general-settings/real-persons/components/new-person/NewPerson';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { useUserInfoContext } from '../../user-info/userInfoContext';
import { useQuery } from '@tanstack/react-query';
import {
 realPersonsBasePath,
 getInitialData,
} from '../../../general-settings/real-persons/services/personsApiActions';

export default function UserProfileContent() {
 const { data } = useUserInfoContext();
 const { realPersonDictionary } = useShareDictionary();
 const {
  data: initialData,
  isLoading: initialDataLoading,
  isError: initialDataError,
  isSuccess: initialDataSuccess,
 } = useQuery({
  staleTime: 'static',
  queryKey: [realPersonsBasePath, 'initial-data'],

  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });

 return (
  <div className='p-4'>
   <NewPerson
    dic={realPersonDictionary}
    personID={data.personID}
    initialData={{
     isLoading: initialDataLoading,
     data: initialData,
     isError: initialDataError,
     isSuccess: initialDataSuccess,
    }}
   />
  </div>
 );
}
